var F = function() {
  this.takeOver = function() {
    
  };
  this.appLoad = function(s) {
    importJSON(s + "/cfg.json").then(s => console.log(s));
  }
  return this;
};
