var importScript = function() {
  arguments = Array.prototype.slice.call(arguments, 0).map(function(e) {
    var script = document.createElement("script");
    script.src = "/js/" + e[0] + ".js";
    script.onload = e[1];
    document.head.appendChild(script);
  });
};
