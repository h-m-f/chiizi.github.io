var hash = function(str) {
  var i;
  var hash = 0;
  var char;
  if (str.constructor !== String)
    str = str.toString();
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};
