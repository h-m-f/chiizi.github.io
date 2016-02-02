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
    
    var elem = document.createElement("div");
    elem.classList.add("win");
    elem.classList.add("initial-size");
    elem.innerHTML = `<div class="wintop" title="${title}" id="${id}">
  <div class="icon reload"></div><div class="icon minimize"></div><div class="icon resize"></div><div class="icon close"></div>
</div>`;
    elem.querySelector(".wintop").addEventListener("mousedown", md, false);
    return elem;
  }
};

var login = newWindow({
  id: "test",
  title: "test"
});
document.body.appendChild(login);
