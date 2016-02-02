var $ = q => document.querySelector(q);
var $$ = q => document.querySelectorAll(q);

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
          ? ["close", "max", "hide"]
          : []),
      right: (mode == "elm"
        ? ["max"]
        : mode == "osx"
          ? []
          : ["hide", "max", "close"])
    }
    
    var elem = document.createElement("div");
    elem.classList.add("win");
    elem.classList.add("initial-size");
    elem.id = id;
    elem.innerHTML = `<div class="wintop" title="${title}">
  <div class="left">${topButtons.left.map(s => `<div class="icon ${s}"></div>`).join("")}</div><div class="right">${topButtons.right.map(s => `<div class="icon ${s}"></div>`).join("")}</div>
</div>`;
    elem.querySelector(".wintop").addEventListener("mousedown", md, false);
    elem.querySelector(".hide").addEventListener("click", () =>
      elem.classList.add("hidden"), false)
    
    var trayListing = document.createElement("div");
    trayListing.id = `tray-${id}`;
    trayListing.innerHTML = `<div class="icon close"></div> <span class="name">${title} (${id})</span>`;
    trayListing.classList.add("tray-listing");
    $(".side-tray").appendChild(trayListing);
    trayListing.querySelector(".close").addEventListener("click", close);
    trayListing.addEventListener("click", () =>
      (elem.classList.remove("hidden"), $(".window-layer").removeChild(elem), $(".window-layer").appendChild(elem)));
    $(".window-layer").appendChild(elem);
    (elem.querySelector(".close") ||  {addEventListener: () => null}).addEventListener("click", close);
    elem.addEventListener("mousedown", () =>
      ($(".window-layer").removeChild($(`#${id}`)), $(".window-layer").appendChild(elem)));
    
    var close = () =>
      ($(".window-layer").removeChild($(`#${id}`)), $(".side-tray").removeChild(`#tray-${id}`));
    
    return elem;
  }
};

var test = newWindow({
  id: "test",
  title: "test"
});
var osx = newWindow({
  mode: "osx",
  id: "osx",
  title: "osx test"
});
