var peer = new Peer(prompt("Choose a name. You'll need to give this to your friends if you want them to play with you."), {key: "zn8snxn231cvunmi"});
peer.on("connection", function(conn) {
  conn.on("data", function(data) {
    // Will print 'hi!'
    console.log(data);
  });
});
var conn = peer.connect(prompt("What is your friend's in-game name?"));
conn.on("open", function() {
  conn.send("hi!");
});
