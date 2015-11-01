var importScript = function(soa, f) {
  if (soa.constructor == Array) {
    var loads = soa.slice(0).fill(false);
    soa.map(function(e, i) {
      var script = document.createElement("script");
      script.src = "/js/" + e + ".js";
      script.onload = function() {
        loads[i] = true;
        if (Math.min.apply(Math, loads)) {
          f();
        }
      };
    });
  } else {
    var script = document.createElement("script");
    script.src = "/js/" + soa + ".js";
    script.onload = f;
    document.head.appendChild(script);
  }
};
