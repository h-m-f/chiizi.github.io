var mouse = {x: 0, y: 0, width: 1, height: 1, in: false, down: false};

document.addEventListener("mousemove", function(e) { 
  mouse.x = e.clientX - canvas.getBoundingClientRect().left || e.pageX - canvas.getBoundingClientRect().left; 
  mouse.y = e.clientY - canvas.getBoundingClientRect().top || e.pageY - canvas.getBoundingClientRect().top;
}, false);
document.addEventListener("mousedown", function(e) {
  mouse.down = true;
});
document.addEventListener("mouseup", function(e) {
  mouse.down = false;
});
document.addEventListener("mouseleave", function(e) { 
  mouse.in = false;
}, false);
document.addEventListener("mouseenter", function(e) { 
  mouse.in = true;
}, false);

var canvas = new CuddlyWoof(25 * 32, 19 * 32);
canvas.append(document.body);

var game = {
  keysDown: {},
  keyboardReady: false,
  cursor: new Image(),
  easterEgg: false,
  menu: {
    open: false,
    trigger: false
  },
  debug: {
    open: false,
    trigger: false
  },
  player: {
    ready: true,
    moved: false,
    width: 32,
    height: 32,
    calcSpeed: 256,
    mainSpeed: 256,
    runSpeed: 1.5,
    specialSub: 2,
    running: false,
    special: false,
    score: 0,
    color: [0, 0, 0, 1],
    inv: Array.apply(null, Array(10)).map(function() {
      return {
        id: 0x0000
      };
    }),
    selection: false
  }
};
game.cursor.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNQTFRFAAAAM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7XlM7Xl0EvUiQAAABB0Uk5TABAgMEBQYHCAj5+vv8/f7yMagooAAACZSURBVDjL3dMxEsQgCAVQRERjUP79T5ti3Sok1ru0vhn9gER/VbwDZeo7SMCGGDakAgCGPIKMT9kjmdiQDryTsk7dJnByGPQbhDvQ72QAGKkMwERh5QYaAFZXStWV46CdkYmIxFP0TIfWc10ncVBpbTU+BIqmtrom8URHciUiqjNu5oAWP0S65xg0nMTd7ODHicpm8dpvfqgL7HEHsOnkzpoAAAAASUVORK5CYII=";

addEventListener("keydown", function(e) {
  game.keysDown[e.keyCode] = true;
  return false;
}, false);

addEventListener("keyup", function(e) {
  delete game.keysDown[e.keyCode];
  return false;
}, false);

game.items = [
  {
    name: "NULL",
    id: 0x0000,
    sprites: {
      "32x32": "http://i.imgur.com/AsXyVLs.png"
    }
  },
  {
    name: "sword",
    id: 0x0001,
    kind: game.types.swordKind,
    sprites: {
      "32x32": "http://i.imgur.com/LC6VU9N.png"
    }
  }
];

game.items.error = {
  name: "ERROR",
  sprites: {
    "32x32": "http://i.imgur.com/hzPr4N6.png"
  }
};

game.getItem = function(id) {
  for (var i = 0; i < game.items.length; i++) {
    if (id == game.items[i].id) {
      return game.items[i];
    }
  }
  return game.items.error;
};

game.tiles = {
  thing: {
    draw: function(x, y) {
      var i = new Image();
      i.src = "http://i.imgur.com/OiL81gs.png";
      canvas.image(i, x, y);
    }
  },
  redCarpet: {
    draw: function(x, y) {
      canvas.color("#faa").rect.fill(x, y, 32, 32);
    }
  },
  blueCarpet: {
    draw: function(x, y) {
      canvas.color("#ccf").rect.fill(x, y, 32, 32);
    }
  },
  floor: {
    draw: function(x, y) {
      canvas.color("#eee").rect.fill(x, y, 32, 32);
    }
  },
  wall: {
    draw: function(x, y) {
      canvas.rect.fill(x, y, 32, 32);
    }
  },
  door: function(map, x, y) {
    this.draw = function(x, y) {
      canvas.color("#5C4742").rect.fill(x, y, 32, 32);
    };
    this.toMap = map;
    this.toX = x;
    this.toY = y;
    this.to = function() {
      game.map = this.toMap;
      game.player.x = this.toX;
      game.player.y = this.toY;
    };
    return this;
  }
};

game.maps = {
  bedroom: {
    name: "Your Bedroom",
    map: Array.apply(null, Array(19)).map(function() {return Array.apply(null, Array(25)).map(function() {return ".";});}),
    substitution: {
      ".": game.tiles.redCarpet,
      "#": game.tiles.wall
    },
    cheatyColDet: function(obj) {
      if (obj.x < 32) {
        obj.x = 32;
      }
      if (obj.x + obj.width > canvas.width - 32) {
        obj.x = canvas.width - (obj.width + 32);
      }
      if (obj.y < 32) {
        obj.y = 32;
      }
      if (obj.y + obj.width > canvas.height - 32) {
        obj.y = canvas.height - (obj.height + 32);
      }
    },
    doorChecks: [
      function(obj) {
        if (obj.x >= 11 * 32 && obj.x + obj.width <= 14 * 32 && obj.y + obj.height >= canvas.height - 32) {
          game.maps.bedroom.substitution["$1"].to();
        }
        if (obj.x >= 11 * 32 && obj.x + obj.width <= 14 * 32 && obj.y + obj.height >= canvas.height - 32) {
          game.maps.bedroom.substitution["$1"].to();
        }
      }
    ]
  },
  upstairsHall: {
    name: "The Upstairs Hall",
    map: Array.apply(null, Array(19)).map(function() {return Array.apply(null, Array(25)).map(function() {return ".";});}),
    substitution: {
      ".": game.tiles.floor,
      "#": game.tiles.wall
    },
    cheatyColDet: function(obj) {
      if (obj.x < 6 * 32) {
        obj.x = 6 * 32;
      }
      if (obj.x + obj.width > canvas.width - 6 * 32) {
        obj.x = canvas.width - (obj.width + 6 * 32);
      }
      if (obj.y < 32) {
        obj.y = 32;
      }
      if (obj.y + obj.width > canvas.height - 32) {
        obj.y = canvas.height - (obj.height + 32);
      }
    },
    doorChecks: [
      function(obj) {
        if (obj.x >= 11 * 32 && obj.x + obj.width <= 14 * 32 && obj.y <= 32) {
          game.maps.upstairsHall.substitution["$1"].to();
        }
      },
      function(obj) {
        if (obj.y >= 8 * 32 && obj.y + obj.width <= 11 * 32 && obj.x <= 6 * 32) {
          game.maps.upstairsHall.substitution["$2"].to();
        }
      }
    ]
  },
  parentsBedroom: {
    name: "Parents' Bedroom",
    map: Array.apply(null, Array(19)).map(function() {return Array.apply(null, Array(25)).map(function() {return ".";});}),
    substitution: {
      ".": game.tiles.blueCarpet,
      "#": game.tiles.wall
    },
    cheatyColDet: function(obj) {
      if (obj.x < 32) {
        obj.x = 32;
      }
      if (obj.x + obj.width > canvas.width - 32) {
        obj.x = canvas.width - (obj.width + 32);
      }
      if (obj.y < 32) {
        obj.y = 32;
      }
      if (obj.y + obj.width > canvas.height - 32) {
        obj.y = canvas.height - (obj.height + 32);
      }
    },
    doorChecks: [
      function(obj) {
        if (obj.y >= 8 * 32 && obj.y + obj.height <= 11 * 32 && obj.x + obj.width >= canvas.width - 32) {
          game.maps.parentsBedroom.substitution["$1"].to();
        }
      }
    ]
  }
};

game.renderMap = function(map) {
  for (var y = 0; y < 19; y++) {
    for (var x = 0; x < 25; x++) {
      game.map.substitution[game.map.map[y][x]].draw(x * 32, y * 32);
    }
  }
};

game.map = game.maps.bedroom;

game.binds = [
  {
    code: 27,
    action: function() {
      if (!game.menu.trigger) {
        game.menu.open = game.menu.open ? false : true;
        game.menu.trigger = true;
      }
    },
    anAction: function() {
      game.menu.trigger = false;
    }
  },
  {
    code: 16,
    action: function() {
      game.player.running = !game.player.special;
    },
    anAction: function() {
      game.player.running = false;
    }
  },
  {
    code: 17,
    action: function() {
      game.player.special = true;
    },
    anAction: function() {
      game.player.special = false;
    }
  },
  {
    code: 38,
    action: function(modifier) {
      game.player.y -= game.player.calcSpeed * modifier;
    }
  },
  {
    code: 40,
    action: function(modifier) {
      game.player.y += game.player.calcSpeed * modifier;
    }
  },
  {
    code: 37,
    action: function(modifier) {
      game.player.x -= game.player.calcSpeed * modifier;
    }
  },
  {
    code: 39,
    action: function(modifier) {
      game.player.x += game.player.calcSpeed * modifier;
    }
  },
  {
    code: 87,
    action: function(modifier) {
      game.player.y -= game.player.calcSpeed * modifier;
    }
  },
  {
    code: 83,
    action: function(modifier) {
      game.player.y += game.player.calcSpeed * modifier;
    }
  },
  {
    code: 65,
    action: function(modifier) {
      game.player.x -= game.player.calcSpeed * modifier;
    }
  },
  {
    code: 68,
    action: function(modifier) {
      game.player.x += game.player.calcSpeed * modifier;
    }
  },
  {
    code: 32,
    action: function() {
      game.player.ready = false;
      game.invIsOpen = true;
    },
    anAction: function() {
      game.player.ready = true;
      game.invIsOpen = false;
    }
  },
  {
    code: 192,
    action: function() {
      if (!game.debug.trigger) {
        game.debug.open = game.debug.open ? false : true;
        game.debug.trigger = true;
        return false;
      }
    },
    anAction: function() {
      game.debug.trigger = false;
    }
  }
];

game.objsTouching = function(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
};

game.maintain = function() {
  "use strict";
  if (game.player.running) {
    game.player.calcSpeed = game.player.mainSpeed * game.player.runSpeed;
  } else if (game.player.special) {
    game.player.calcSpeed = game.player.mainSpeed / game.player.specialSub;
  } else {
    game.player.calcSpeed = game.player.mainSpeed;
  }
  if (game.menu.open) {
    game.player.ready = false;
  } else {
    game.player.ready = true;
  }
  if (game.invIsOpen) {
    game.player.calcSpeed = 96;
  }
  if (!game.player.ready) {
    game.player.calcSpeed = 0;
  }
  game.player.color = game.player.special ? [0, 68, 255, 1] : game.player.running ? [255, 0, 0, 1] : [0, 0, 0, 1];
  if (game.player.x < 0) {
    game.player.x = 0;
  }
  if (game.player.x + 32 > canvas.width) {
    game.player.x = canvas.width - 32;
  }
  if (game.player.y < 0) {
    game.player.y = 0;
  }
  if (game.player.y + 32 > canvas.height) {
    game.player.y = canvas.height - 32;
  }
  game.map.cheatyColDet(game.player);
  for (let i = 0; i < game.map.doorChecks.length; i++) {
    game.map.doorChecks[i](game.player);
  }
  game.player.x = Math.round(game.player.x / 2) * 2;
  game.player.y = Math.round(game.player.y / 2) * 2;
};

game.update = function(modifier) {
  for (var i = 0; i < game.binds.length; i++) {
    if (game.binds[i].code in game.keysDown) {
      game.binds[i].action(modifier);
    } else if (game.binds[i].anAction) {
      game.binds[i].anAction(modifier);
    }
  }
  game.maintain();
};
