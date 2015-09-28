document.body.appendChild(function() {
  var script = document.createElement("script");
  script.src = "http://cdn.peerjs.com/0.3/peer.min.js";
  return script;
});
var peer = new Peer({key: "zn8snxn231cvunmi"});
var conn = peer.connect('another-peers-id');
conn.on('open', function(){
  conn.send('hi!');
});
peer.on('connection', function(conn) {
  conn.on('data', function(data){
    // Will print 'hi!'
    console.log(data);
  });
});
