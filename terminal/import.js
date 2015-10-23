send.register("import", path => {
  var process = (path => path.replace(/^(?:\/\/)/, "https:") + ".js");
  var script = document.createElement("script");
  script.src = process(path);
  document.body.appendChild(script);
});
