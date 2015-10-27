send.register("import", (io, path) => {
  var process = (path => path.replace(/^\/\//, "https://") + ".js");
  var script = document.createElement("script");
  script.src = process(path);
  io(path + " imported as " + process);
  document.body.appendChild(script);
});
