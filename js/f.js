var F = function() {
  this.takeOver = function() {
    document.getElementById("f")
  }
  this.appLoad = function(s) {
    importJSON(s + "/cfg.json").then(o => {
      
    })
  }
  return this
}
