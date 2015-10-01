var load = function() {
  Array.prototype.map.call(arguments, function(ee) {
    var script = document.createElement("script");
    script.src = ee;
    document.body.appendChild(script);
  });
}
