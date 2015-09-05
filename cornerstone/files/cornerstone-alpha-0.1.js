var cornerstone = (function() {
  var canvas = document.getElementById("frame");
  var ctx = canvas.getContext("2d");
  
  canvas.width = 512;
  canvas.height = 480;
  
  var iteration = 0;
  
  var sessionOpen = false;
  var noClear = false;
  var paused = false;
  
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
    })();
  };
  
  var render = function() {
    if (!noClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (!sessionOpen) {
      titleRender();
    }
  };
  
  var keysDown = [];
  window.addEventListener.keydown = function(e) {
    keysDown[e.keyCode] = true;
  };
  window.addEventListener.keyup = function(e){
    keysDown[e.keyCode] = false;
  };
  var keyIsDown = function(code) {
    return !!keysDown(code);
  };
  
  var update = function() {
    if (sessionOpen) {
      
    } else {
      
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
