var XMeepProto = Object.create(HTMLElement.prototype);

XMeepProto.createdCallback = function() {
  var shadow = this.createShadowRoot();
  shadow.innerHTML = "hello.";
};

var XMeep = document.registerElement("x-meep", {prototype: XMeepProto});
