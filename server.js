const path = require('path');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');




const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
// const io = require('socket.io')(server, {cors:{origin:"*"}})
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST" ]
  }
});

const { v4: uuidV4 } = require('uuid')
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use(cors());

// Set up o render our views 
app.set('view engine', 'ejs')

// Set static Folder
// all css and js in public folder
app.use(express.static('public'))

// app.engine('.html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use('/peerjs', peerServer);
// app.get('/:welcom', (req, res) => {
  // res.render('welcome')
  // res.redirect(`/${uuidV4()}`)
  // console.log("heyy")
// })

// create brand new room with unique id
app.get('/', (req, res) => {
  res.render('welcome')
  // res.redirect(`/${uuidV4()}`)
  // console.log("heyy")
})

// srv = app.listen(process.env.PORT || 3000)
// app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
//   debug: true
// }))
app.get('/game', (req, res) => {
  res.render('gamepage1')
})

app.get('/memorygame', (req, res) => {
  res.render('memoryGame')
})
app.get('/chat', (req, res) => {
  res.render('chatroom.ejs')
})
app.get('/towerblocks', (req, res) => {
  res.render('towerBlocks')
})
// create brand new room with unique id
app.get('/call', (req, res) => {
  res.redirect(`/${uuidV4()}`)
//   // console.log("heyy")
})

// console.log("heyy1");
app.get('/:room', (req, res) => {

  res.render('room', { roomId: req.params.room })
  // console.log("heyy2");
})



const botName = 'Admin';

// run anytime somenone connects to our webpage
io.on('connection', socket => {
  // console.log('a user connected');
  // try{
  socket.on('join-room', (roomId, userId) => {
    // socket.emit('chat message', 'Hello World.');
    // console.log(roomId,userId)
    // new user joins roomId
    socket.join(roomId)
    //Broadcasts that new user has connected
    socket.to(roomId).broadcast.emit('user-connected', userId)

    //----------------message ----------------
    socket.on('add-us', (adminId) => {
      socket.to(roomId).broadcast.emit("add-others", adminId);
    })

    socket.on("disconnected", userToRemove => {
      socket.to(roomId).broadcast.emit("user-disconnected", userToRemove)
    })

    socket.on("new message", (message, id) => {
      socket.to(roomId).broadcast.emit("user-message", message, id);
    })
    
//     const user = userJoin(socket.id, userId, roomId);

//     socket.join(roomId);

//     // Welcome current user
    // socket.emit('message', formatMessage(botName, 'Welcome to MS Teams!'));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(roomId)
//       .emit(
//         'message',
//         formatMessage(botName, `${userId} has joined the chat`)
//       );

//     // Send users and room info
//     io.to(roomId).emit('roomUsers', {
//       room: user.room,
//       users: getRoomUsers(user.room)
//     });


//     socket.on('chatMessage', (msg,room) => {
//     // const user = getCurrentUser(socket.id);
// console.log(user.room.username)
//     io.to(roomId).emit('message', formatMessage(user.room.username, msg));
//   });

//   // Runs when client disconnects
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)

//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(roomId).emit(
//         'user-disconnected',
//         formatMessage(botName, `${userId} has left the chat`), userId
//       );

//       // Send users and room info
//       io.to(roomId).emit('roomUsers', {
//         room: roomId,
//         users: getRoomUsers(roomId)
//       });
//     }
//   });

  

    // // qUICKLY closes the video of the other user
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    //   socket.to(roomId).broadcast.emit('user-disconnected', userId)
    // })
  })

// ---------------------
// Listen for chatMessage
  

// }
// catch(err){
//   console.log(err);
// }

})

// server.listen(process.env.PORT || 3000);
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server Started on ${port}`)) 
// server.listen(3000)


// npm install -y
// npm i express ejs socket.io
// npm i uuid
// npm i --save-dev nodemon
// npm run devStart


// npm i -g peer
// peerjs --port 3001