var importPolymer = function(ver) {
  arguments = Array.prototype.slice.call(arguments, 1);
  arguments.map(function(e) {
    var link = document.createElement("link");
    link.rel = "import";
    link.href = "https://www.polymer-project.org/" + ver + "/components/" + e + "/" + e + ".html";
    document.head.appendChild(link);
  });
};
