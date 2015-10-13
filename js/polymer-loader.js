var importPolymer = function(ver) {
  arguments = Array.prototype.slice.call(arguments, 1);
  arguments.map(function(e) {
    var link = document.createElement("link");
    link.rel = "import";
    link.href = this.src() + ver + "/components/" + e + "/" + e + ".html";
    document.head.appendChild(link);
  });
};
importPolymer.src = (function() {
  var src = "https://www.polymer-project.org/";
  return function(newSrc) {
    return src = newSrc || src;
  }
});
