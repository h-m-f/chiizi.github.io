var STOP = false;
var cornerstone = (function() {
  var Color = function(r, g, b) {
    this.getHex = function() {
      return "#" + (r & 0xFF).toString(16) + (g & 0xFF).toString(16) + (b & 0xFF).toString(16);
    };
    this.invert = function() {
      return new Color(255 - r, 255 - g, 255 - b);
    }
    return this;
  };
  
  var canvas = document.getElementById("frame");
  canvas.x = 0;
  canvas.y = 0;
  var ctx = canvas.getContext("2d");
  
  ctx.invertRect = function(x, y, width, height) {
    var _data = ctx.getImageData(x, y, width, height);
    var data = _data.data;
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // R
      data[i + 1] = 255 - data[i + 1]; // G
      data[i + 2] = 255 - data[i + 2]; // B
    }
    ctx.putImageData(_data, x, y);
  }
  
  var tcc = function(fn, color) {
    var old = ctx.fillStyle;
    ctx.fillStyle = color;
    fn();
    ctx.fillStyle = old;
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
    render: (() => tcc((() => ctx.fillRect(this.x, this.y, 32, 32)), "#0F8"))
  };
  
  var titleRender = function() {
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
  };
  
  var renderStack = [player];
  
  var sessionRender = function() {
    if (Math.round(iteration / 30) % 2) {
      ctx.font = "Bold 30px Courier New";
      ctx.textAlign = "center";
      ctx.fillText("SESSION IN PROGRESS", canvas.width / 2, canvas.height / 2)
    }
    renderStack.forEach(o => o.render());
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
    ctx.font = "Bold 20px Courier New";
    ctx.textAlign = "left";
    
    tcc(() => ctx.fillText("cornerstone ver. alpha-0.1.2", 16, 16), "rgba(128, 128, 128, 128)");
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
    if (!STOP)
      requestAnimationFrame(main);
  })();
  return (s => eval(s));
})();
