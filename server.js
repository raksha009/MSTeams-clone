const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

// Set up o render our views 
app.set('view engine', 'ejs')
// all css and js in public folder
app.use(express.static('public'))

// create brand new room with unique id
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})


app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})


// run anytime somenone connects to our webpage
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    // console.log(roomId,userId)
    // new user joins roomId
    socket.join(roomId)
    //Broadcasts that new user has connected
    socket.to(roomId).broadcast.emit('user-connected', userId)

    // qUICKLY closes the video of the other user
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

erver.listen(process.env.PORT || 3000); 
// server.listen(3000)


// npm install -y
// npm i express ejs socket.io
// npm i uuid
// npm i --save-dev nodemon
// npm run devStart


// npm i -g peer
// peerjs --peer 3001