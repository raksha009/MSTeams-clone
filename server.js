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
// all css and js in public folder
app.use(express.static('public'))


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


// create brand new room with unique id
app.get('/call', (req, res) => {
  res.redirect(`/${uuidV4()}`)
//   // console.log("heyy")
})

console.log("heyy1");
app.get('/:room', (req, res) => {

  res.render('room', { roomId: req.params.room })
  console.log("heyy2");
})



// run anytime somenone connects to our webpage
io.on('connection', socket => {
  console.log('a user connected');
  try{
  socket.on('join-room', (roomId, userId) => {
    socket.emit('chat message', 'Hello World.');
    console.log(roomId,userId)
    // new user joins roomId
    socket.join(roomId)
    //Broadcasts that new user has connected
    socket.to(roomId).broadcast.emit('user-connected', userId)

    // qUICKLY closes the video of the other user
    socket.on('disconnect', () => {
      console.log('user disconnected');
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
}
catch(err){
  console.log(err);
}

})

server.listen(process.env.PORT || 3000); 
// server.listen(3000)


// npm install -y
// npm i express ejs socket.io
// npm i uuid
// npm i --save-dev nodemon
// npm run devStart


// npm i -g peer
// peerjs --port 3001