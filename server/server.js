const io = require("socket.io");
const http = require('http');
// const eiows = require("eiows");
const httpserver = http.createServer((req,res) =>{
  res.write(hello);
  res.end();
});

  const io1 = new io.Server(httpserver, {
    cors: {
      origin: ["http://127.0.0.1:5500"],
      allowedHeaders: ["hello"],
      credentials: true
    }
  });

  const users = {}

  io1.on("connection", (socket) => {
    console.log("hello");

    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });

    //if someone send messge the message then broadcast it to other peaple
    socket.on('send', message =>{
      socket.broadcast.emit('recieve',message);
    })

    // on leave the user
    socket.on('disconnect',(name)=>{
      socket.broadcast.emit('leave',users[socket.id]);
      delete users[socket.id];
    })

  });

  io1.listen(8000);