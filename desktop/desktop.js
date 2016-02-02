String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};

document.documentElement.addEventListener("click", () =>
  document.documentElement.webkitRequestFullscreen());

var windows = [];
var newWindow = (options) => {
  with (options) {
    var md = e => {
      offX = e.clientX - parseInt(elem.offsetLeft);
      offY = e.clientY - parseInt(elem.offsetTop);
      window.addEventListener("mousemove", mm, true);
      window.addEventListener("mouseup", mu, true);
    };
    var mu = () => {
      window.removeEventListener("mousemove", mm, true);
    };
    var mm = e => {
      if (e.clientX >= 0 && e.clientY >= 0 && e.clientX < innerWidth && e.clientY < innerHeight - 49) {
        elem.style.left = (e.clientX - offX) + "px";
        elem.style.top = (e.clientY - offY) + "px";
      }
    };
    var offX;
    var offY;
    
    var mode = options.mode || "elm";
    var topButtons = {
      left: (mode == "elm"
        ? ["hide"]
        : mode == "osx"
          ? ["exit", "resize", "hide"]
          : []),
      right: (mode == "elm"
        ? ["max"]
        : mode == "osx"
          ? []
          : ["exit", "resize", "hide"])
    }
    
    var elem = document.createElement("div");
    elem.classList.add("win");
    elem.classList.add("initial-size");
    elem.innerHTML = `<div class="wintop" title="${title}" id="${id}">
  <div class="left">${topButtons.left.map(s => `<div class="icon ${s}"></div>`)}</div><div class="right">${topButtons.right.map(s => `<div class="icon ${s}"></div>`)}</div>
</div>`;
    elem.querySelector(".wintop").addEventListener("mousedown", md, false);
    elem.querySelector(".hide").addEventListener("mousedown", () =>
      elem.classList.add("hidden"), false)
    return elem;
  }
};

var login = newWindow({
  id: "test",
  title: "test"
});
document.body.appendChild(login);
