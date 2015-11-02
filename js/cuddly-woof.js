var CuddlyWoof = function(width, height) {
  var $ = this;
  datamode = false;
  persistentDatamode = false;
  $ ._ = function() {
    if (persistentDatamode == true) {
      persistentDatamode = datamode = false;
    } else if (datamode == true) {
      persistentDatamode = datamode = true;
    } else {
      datamode = true;
    }
    return $;
  }
  $.size = function() {
    return {
      width: width,
      height: height
    }
  };
  
  $.layers = [];
  $.layer = {
    add: function() {
      var a = document.createElement("canvas");
      a.width = width;
      a.height = height;
      $.layers.push(a);
      if (datamode) {
        if (!persistentDatamode) {
          datamode = false;
        }
        return [$, $.layers[$.layers.length - 1]];
      } else {
        return $;
      }
    }
  };
  $.layerSet = (function() {
    var layer = 0;
    return function(n) {
      if (typeof n == "number") {
        layer = n;
        $.canvas = $.layers[layer];
        $.ctx = $.layers[layer].getContext("2d");
      }
      if (datamode) {
        if (!persistentDatamode) {
          datamode = false;
        }
        return [$, layer];
      } else {
        return $;
      }
    }
  })();
  $.layer.add();
  $.layerSet(0);
  
  $.fragments = [];
  $.fragment = {
    add: function(width, height) {
      var fragment = new CuddlyWoof(width, height);
      fragment.drawUp = function(x, y) {
        $.image(fragment.canvas)
      };
      $.fragments.push();
    }
  }
  $.draw = function(dest, x, y) {
    dest.drawImage($.canvas, x, y);
  }
  
  $.color = function(color) {
    oldColor = $.ctx.fillStyle;
    if (color) {
      $.ctx.fillStyle = color;
    }
    if (datamode) {
      if (!persistentDatamode) {
        datamode = false;
      }
      return [$, oldColor];
    } else {
      return $;
    }
  }
  
  $.clear = function(c) {
    if (c) {
      var oldColor = $._().color(c)[1];
      $
       .rect.fill(0, 0, $.canvas.width, $.canvas.height)
       ._(). color(oldColor);
    } else {
      $.ctx.clearRect(0, 0, $.canvas.width, $.canvas.height);
    }
    if (datamode) {
      if (!persistentDatamode) {
        datamode = false;
      }
      return [$, c];
    } else {
      return $;
    }
  }
  $.rect = {
    fill: function(x, y, w, h, c) {
      if (c) {
        var oldColor = $ ._(). color(c)[1];
        $.ctx.fillRect(x, y, w, h);
        $.color(oldColor);
      } else {
        $.ctx.fillRect(x, y, w, h);
      }
      if (datamode) {
        if (!persistentDatamode) {
          datamode = false;
        }
        return [$, c];
      } else {
        return $;
      }
    }
  };
  $.image = function(image, x, y) {
    $.ctx.drawImage(image, x, y);
    return $;
  }
  
  $.append = function(elem) {
    if (elem.constructor == String) {
      document.getElementById(elem).appendChild($.canvas);
    } else if (elem instanceof HTMLElement) {
      elem.appendChild($.canvas);
    }
    if (datamode) {
      if (!persistentDatamode) {
        datamode = false;
      }
      return [$, elems];
    } else {
      return $;
    }
  }
  
  return $;
};
