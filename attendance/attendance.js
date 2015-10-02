var attendance = (function() {
  var setCookie = function(cname, cvalue, extime) {
    document.cookie = cname + "=" + cvalue + "; " + extime;
  };
  var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  if (document.cookie.search("student") == -1) {
    setCookie("student", "[]", "Mon, 6 June 2016 12:00:00 UTC");
  }
  JSON.parse(getCookie("students")).map(function(ee) {
    var tr = document.createElement("tr");
    var tdSelect = document.createElement("td");
    var tdName = document.createElement("td");
    tdSelect.innerHTML = "<select><option>Present</option><option>Excused</option><option>Tardy</option><option>Truant</option></select>";
    tdName.innerHTML = ee;
    tr.appendChild(tdSelect);
    tr.appendChild(tdName);
    document.getElementById("students").appendChild(tr);
  });
  return {
    add: function(names) {
      var existing = JSON.parse(getCookie("students"));
      existing.concat(names);
      setCookie("students", JSON.stringify(existing), "Mon, 6 June 2016 12:00:00 UTC");
      location.reload();
    },
    remove: function(names) {
      var existing = JSON.parse(getCookie("students"));
      existing.map(function(ee, ii) {
        existing.splice(ii, names.indexOf(ee) != -1 ? 1 : 0);
      });
      setCookie("students", JSON.stringify(existing), "Mon, 6 June 2016 12:00:00 UTC");
      location.reload();
    }
  };
})();
