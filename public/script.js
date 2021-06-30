const socket = io('/')   // connect to root path of outr application
const videoGrid = document.getElementById('video-grid')

// underfined as server geberate our userId
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: ':/',
  port: '443'   //3001  //443
})

//Turn on my video
const myVideo = document.createElement('video')
myVideo.muted = true    // as we dont want to listen to our ownselfs
const peers = {}

// A Promise to send our stream(audio, video) to other peple

let myVideoStream;
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)


  // Have video shown on browser on refreshing
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

// as soon as user connected => run and connect user to new uswer id
// Changes here
  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)    
      console.log('New User Connected: ' + userId)    
  const fc = () => connectToNewUser(userId, stream)
  timerid = setTimeout(fc, 1000 )
  })
})

// Close the connection if peer disconnected
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})


myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)    // Pass on our stream to peer
  const video = document.createElement('video')

  // get connecteduser's video
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })

  // Closes video of peple once they leave the call
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

// play our video
function addVideoStream(video, stream) {
  video.srcObject = stream     
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}



// for stop and mute button functionality
// Mute our video
const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;    //[0] means my audio
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}


const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}


const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}


const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

