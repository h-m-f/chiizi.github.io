var importScript = function() {
  arguments = Array.prototype.slice.call(arguments, 0).map(function(e) {
    var script = document.createElement("script");
    script.src = "/js/" + e + ".js";
    document.head.appendChild(script);
  });
};
