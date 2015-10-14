var importScript = function() {
  arguments = Array.prototype.slice.call(arguments, 1).map(function(e) {
    var script = document.createElement("script");
    script.src = e;
    document.head.appendChild(script);
  });
};
