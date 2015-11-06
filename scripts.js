var importScript = function(soa, f, sza, bzf) {
  sza = sza != undefined ? sza : ".js";
  if (soa.constructor == Array) {
    var loads = soa.slice(0).fill(false);
    soa.map(function(e, i) {
      var script = document.createElement("script");
      script.src = "/js/" + e + sza;
      script.onload = function() {
        loads[i] = true;
        if (Math.min.apply(Math, loads)) {
          f();
        }
      };
    });
  } else {
    var script = document.createElement("script");
    if (soa[0] == "/") {
      script.src = "https://" + (/^\/[0-9A-Za-z-.]+/).exec(soa)[0].split("").slice(1).join("").split(".").reverse().join(".") + (/^[0-9A-Za-z-./]+?(?=[0-9A-Za-z-.]+\/$)/).exec(soa.split("").reverse().join(""))[0].split("").reverse().join("") + sza;
    } else if (soa[0] == "~") {
      script.src = "/" + soa.substr(1) + sza;
    } else if (soa[0] == "!") {
      script.src = importScript(soa.substr(1), f, "", true).src;
    } else {
      script.src = "/js/" + soa + sza;
    }
    script.onload = f;
    return bzf ? script : document.head.appendChild(script), script;
  }
};
