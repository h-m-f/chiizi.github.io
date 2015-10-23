(function init() {
  console.log("IT'S WORKING");
  out("CRUDE EVOLUTION SIMULATOR\n(c) HANS FELDE 2015\ngenerating creatures...");
  var creatures = Array(50).fill().map(_ => Math.round(Math.random() * 4294967295));
  out("done.")
  var _cull = (a => a.splice((a.indexOf(Math.min.apply(Math, a))), 1).toString(16));
  var _breed = function(a) {
    var child = Array(2).fill().map(_ => (a[Math.round(Math.random() * (a.length - 1))]).toString(16));
    var str = "";
    for (var i = 0; i < 8; i++) {
      str += (!!Math.round(Math.random()) ? child[0][i] : child[1][i]);
    }
    a.push(parseInt(str, 16));
    return str;
  };
  (function main() {
    var cull = _cull(creatures);
    var bred = _breed(creatures);
    out("CULLED: " + cull + ", NEW: " + bred + ", AVERAGE PERFECTION: " + Math.round((function(a) {
      var ret = 0;
      a.map((_, i, a) => ret += a[i]);
      return ret / a.length;
    })(creatures)).toString(16));
    window.scrollTo(0, document.body.scrollHeight);
    requestAnimationFrame(main);
  })();
})();
