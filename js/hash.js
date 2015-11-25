var hash;
importScript("/com.rawgit.cdn/Caligatio/jsSHA/03f898d654cc83f952a16e2372a89a3ebadae435/src/sha", () =>
  hash = (s, f, o) =>
    (o = o || new jsSHA("SHA-512", "TEXT")).update(s)
    , setTimeout(() => f(o.getHash("HEX")), 0));
