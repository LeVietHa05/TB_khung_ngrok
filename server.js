//create an express app with socketio
var express = require("express");
var app = express();
var http = require("http").Server(app);
//io needs to have allow EIO3 and cors
var io = require("socket.io")(http, {
  transports: ["websocket", "polling"],
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

app.use(express.static("public"));

//serve the index.html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//listen for a connection
io.on("connection", function (socket) {
  console.log("a user connected");

  //topic name: 'phone1', msg is in this format: '0369677432', parse the msg an take last 9 digits
  socket.on("phone1", function (msg) {
    console.log("phone1: " + msg);
    var phone = msg.slice(-9);
    console.log("phone1: " + phone);
    socket.broadcast.emit("phone1", phone);
  });

  //topic name: 'phone2', msg is in this format: '0369677432', parse the msg an take last 9 digits
  socket.on("phone2", function (msg) {
    console.log("phone2: " + msg);
    var phone = msg.slice(-9);
    console.log("phone2: " + phone);
    socket.broadcast.emit("phone2", phone);
  });

  //this is message from esp8266 client
  socket.on("message", function (msg) {
    // console.log(msg);
    socket.broadcast.emit("message", msg);
  });
});


//listen on port 3000
http.listen(process.env.PORT || 3500, function () {
  console.log("listening on *:3500");
});
