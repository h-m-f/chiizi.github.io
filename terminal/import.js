send.register("import", (path, io) => {
  var process = (path => path.replace(/^\/\//, "https://") + ".js");
  var script = document.createElement("script");
  script.src = process(path);
  io(path + " imported as " + process);
  document.body.appendChild(script);
});
