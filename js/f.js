var F = function() {
  $ = document.querySelector
  $$ = document.querySelectorAll
  $new = document.createElement
  var e = document.getElementById("f") || $("body").appendChild(e => e.id = "f")($new("div"))
  
  this.log = s =>
    
  this.appLoad = function(s) {
    importJSON(s + "/cfg.json").then(o => {
      importScript(s + o.init)
    })
  }
  return this
}
