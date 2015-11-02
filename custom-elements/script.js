var TerminalLineProto = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      var t = document.querySelector("#terminal-line-style");
      var clone = document.importNode(t.content, true);
      this.createShadowRoot().appendChild(clone);
    }
  }
});

var HTMLTerminalLineElement = document.registerElement("terminal-line", {prototype: TerminalLineProto});
