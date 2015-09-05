var cornerstone = (function() {
  const SIMPLE = Symbol();
  
  var Color = function(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.getHex = function() {
      return "#" + (this.r & 0xFF).toString(16) + (this.g & 0xFF).toString(16) + (this.b & 0xFF).toString(16);
    };
    this.setHex = function(hex) {
      hex = hex.replace("#", "");
      this.r = parseInt(hex, 16) & 0xFF0000 >> 16;
      this.g = parseInt(hex, 16) & 0x00FF00 >> 8;
      this.b = parseInt(hex, 16) & 0x0000FF;
    };
    return this;
  };
  var Invert = function() {
    return this;
  }
  
  var canvas = document.getElementById("frame");
  canvas.x = 0;
  canvas.y = 0;
  var ctx = canvas.getContext("2d");
  
  ctx.invertRect = function(x, y, width, height) {
    var data = ctx.getImageData(x, y, width, height);
    for (var i = 0; i < data.data.length; i += 4) {
      data.data[i] = 255 - data.data[i]; // R
      data.data[i + 1] = 255 - data.data[i + 1]; // G
      data.data[i + 2] = 255 - data.data[i + 2]; // B
    }
    ctx.putImageData(data, x, y);
  }
  
  canvas.width = 512;
  canvas.height = 480;
  
  var iteration = 0;
  
  var sessionOpen = false;
  var noClear = false;
  var paused = false;
  
  var player = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    speed: 64,
    render: {
      type: SIMPLE,
      skin: new Color(0xFF, 0xFF, 0xFF),
      fn: ctx.fillRect
    }
  };
  
  var titleRender = function() {
    (function() {
      var oteration = iteration;
      while (oteration >= 30) {
        oteration -= 30;
      }
      oteration = 30 - oteration;
      for (var count = -1; count < 15; count++) {
        ctx.fillRect((canvas.width - 32) / 16 * (oteration / 15 + 2 * count), canvas.height - 32, 32, 32);
      }
      oteration -= 7.5;
      while (oteration >= 30) {
        oteration -= 30;
      }
      while (oteration < 0) {
        oteration += 30;
      }
      ctx.fillRect(16, canvas.height - 96 + Math.abs(oteration - 15) / 15 * 32, 32, 32);
      
      ctx.font = "Bold 30px Courier New";
      ctx.textAlign = "center";
      
      var text = "CORNERSTONE";
      var point = Math.round(Math.random() * 11);
      text = text.substring(0, point) + String.fromCharCode(Math.round(Math.random() * 32) + 32) + text.substring(point + 1, 12);
      point = Math.round(Math.random() * 11);
      text = text.substring(0, point) + String.fromCharCode(Math.round(Math.random() * 32) + 32) + text.substring(point + 1, 12);
      point = Math.round(Math.random() * 11);
      text = text.substring(0, point) + String.fromCharCode(Math.round(Math.random() * 32) + 32) + text.substring(point + 1, 12);
      point = Math.round(Math.random() * 11);
      text = text.substring(0, point) + String.fromCharCode(Math.round(Math.random() * 32) + 32) + text.substring(point + 1, 12);
      ctx.fillText((function() {
        var re = "";
        var a = 0;
        while (a < 11) {
          re += String.fromCharCode(Math.round(Math.random() * 32) + 32);
          a++;
        }
        return re;
      })(), canvas.width / 2, canvas.height / 3 - 30);
      ctx.fillText(text, canvas.width / 2, canvas.height / 3);
      ctx.fillText((function() {
        var re = "";
        var a = 0;
        while (a < 11) {
          re += String.fromCharCode(Math.round(Math.random() * 32) + 32);
          a++;
        }
        return re;
      })(), canvas.width / 2, canvas.height / 3 + 30);
      if (Math.round(iteration / 60) % 2) {
        ctx.font = "Bold 30px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("ENTER TO START SESSION", canvas.width / 2, canvas.height / 2)
      }
    })();
  };
  
  var renderStack = [player];
  
  var sessionRender = function() {
    if (Math.round(iteration / 60) % 2) {
      ctx.font = "Bold 30px Courier New";
      ctx.textAlign = "center";
      ctx.fillText("SESSION IN PROGRESS", canvas.width / 2, canvas.height / 2)
    }
    for (var ii = 0; ii < renderStack.length; ii++) {
      if (renderStack[ii].render.type == SIMPLE) {
        if (renderStack[ii].render.skin.constructor = Color) {
          ctx.fillStyle = renderStack[ii].render.skin.getHex();
        }
        renderStack[ii].render.fn(renderStack[ii].x, renderStack[ii].y, renderStack[ii].width, renderStack[ii].height);
      }
    }
  };
  
  var render = function() {
    if (!noClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (!sessionOpen) {
      titleRender();
    } else {
      sessionRender();
    }
  };
  
  var keysDown = [];
  window.onkeydown = function(e) {
    keysDown[e.keyCode] = true;
  };
  window.onkeyup = function(e){
    keysDown[e.keyCode] = false;
  };
  var keyIsDown = function(code) {
    return !!keysDown[code];
  };
  
  var constrain = function(objA, objB) {
    objB.x = objA.x > objB.x ? objA.x : objB.x;
    objB.x = objA.x + objA.width < objB.x + objB.width ? objA.x + objA.width < objB.x : objB.x + objB.width;
    objB.y = objA.y > objB.y ? objA.y : objB.y;
    objB.y = objA.y + objA.height < objB.y + objB.height ? objA.y + objA.height < objB.y : objB.y + objB.height;
    return objB;
  }
  
  var update = function() {
    if (sessionOpen) {
      if (keyIsDown(37) ||  keyIsDown(65)) { // left, a
        player.x -= player.speed / 60;
      }
      if (keyIsDown(38) ||  keyIsDown(87)) { // up, w
        player.y -= player.speed / 60;
      }
      if (keyIsDown(39) ||  keyIsDown(68)) { // right, d
        player.x += player.speed / 60;
      }
      if (keyIsDown(40) ||  keyIsDown(83)) { // down, s
        player.y += player.speed / 60;
      }
      player = constrain(canvas, player);
    } else {
      if (keyIsDown(13)) {
        sessionOpen = true;
      }
    }
  };
  
  var main;
  (main = function() {
    update();
    
    render();
    
    iteration++;
    requestAnimationFrame(main);
  })();
  return function(fn) {
    return fn();
  };
})();
