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

// Set up to render our views 
app.set('view engine', 'ejs')

// Set static files location -  all html, css and js in public folder
app.use(express.static('public'))

app.use('/peerjs', peerServer);


// Enter Landing Page (or welcome page)
app.get('/', (req, res) => {
  res.render('welcome')
})

// Enter Game Zone
app.get('/game', (req, res) => {
  res.render('gamepage1')
})

// Enter Memory Game
app.get('/memorygame', (req, res) => {
  res.render('memoryGame')
})
// Enter TowerBlocks game
app.get('/towerblocks', (req, res) => {
  res.render('towerBlocks')
})


// Enter Chat Room
app.get('/chat', (req, res) => {
  res.render('chatroom.ejs')
})


// Create a room with unique id for Video Call
app.get('/call', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})



const botName = 'Admin';

// Establish connection when peer joins our webpage
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    // new user joins roomId
    socket.join(roomId)

    //----------------For Chat Message ----------------
    // Welcome current user
    socket.emit('welcm-message', formatMessage(botName, 'Welcome to MS Teams!'));

    //Broadcasts that new user has connected
    socket.to(roomId).broadcast.emit('user-connected', userId)
    
    socket.on('add-us', (adminId) => {
      socket.to(roomId).broadcast.emit("add-others", adminId);
    })


    // User Leaves
    socket.on("disconnected", userToRemove => {
      socket.to(roomId).broadcast.emit("user-disconnected", userToRemove)
    })

    // User enters a new message
    socket.on("new message", (message, id) => {
      socket.to(roomId).broadcast.emit("user-message", message, id);
    })

              //FOR SCREEN SHARING STARTS
           socket.on('share-screen',video => {
            socket.broadcast.emit('share-share', video)

          })
  })
})

// server.listen(process.env.PORT || 3000);
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server Started on ${port}`)) 
