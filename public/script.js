const socket = io('/')   // connect to root path of outr application
const videoGrid = document.getElementById('video-grid')

// underfined as server geberate our userId
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  // Values for hosting on Localhost port - 3000
  host: 'localhost',
  port : '3000'   

  // Values for Hosting on heroku 
  // host : 'ms-teams--clone.herokuapp.com',
  // port: '443'
})

let currentPeer;
//Turn on my video
const myVideo = document.createElement('video')
myVideo.muted = true  
const peers = {}


// A Promise to send our stream(audio, video) to other peple
let myVideoStream;
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)

  // Display other joines video stream
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      console.log("here");
      addVideoStream(video, userVideoStream);
      currentPeer = call.peerConnection
    })
  })



  // Connect us to the peer
  socket.on('user-connected', userId => {
      // connectToNewUser(userId, stream)    
      console.log('New User Connected: ' + userId)    
      const fc = () => connectToNewUser(userId, stream)
      timerid = setTimeout(fc, 1000 )
      // peers[userId] = call;
  })
})

// Close the connection if peer disconnected
socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})


// Join with the unique url
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)    // Pass on our stream to peer
  const video = document.createElement('video')

  // Get connected user's video
  call.on('stream', userVideoStream => {
    // console.log(call.peerConnection, "-----");
    addVideoStream(video, userVideoStream)
    currentPeer = call.peerConnection
  })


  // Removes the video of the peer from our end once they leave the call
  call.on('close', () => {
    video.remove()
  })
  peers[userId] = call
}

// Add our videostream to display
function addVideoStream(video, stream) {
  video.srcObject = stream     
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}





// Toggle our mic 
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

// Mute ourself
const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

// Unmute ourselves
const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}





// Toggle our video Display
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

// Stop Displaying Video
const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

// Open video
const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}






// Invite Other Users 
document.getElementById("invite-button").addEventListener("click", getURL);

// get out unique URL 
function getURL() {
  const inviteurl = window.location.href;
  copyToClipboard(inviteurl);
  alert("                URL Copied to Clipboard!\n                Just Paste it to share!\nUrl: " + inviteurl);
}

// copy the unique URL to clipboard
function copyToClipboard(text) {
  var urltext = document.createElement("textarea");
  document.body.appendChild(urltext);
  urltext.value = text;
  urltext.select();
  document.execCommand("copy");
  document.body.removeChild(urltext);
}





// Screen Sharing Feature
const shareScreen = document.querySelector("#screenshare");
shareScreen.addEventListener('click', (e) => {
  navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always"
    }, audio: {
      echoCancellation: true,
      noiseSuppression: true
    }
  }).then((stream) => {
    let videoTrack = stream.getVideoTracks()[0];
    videoTrack.onended = function () {
      stopScreenShare();
    }

    let sender = currentPeer.getSenders().find(function (s) {
      return s.track.kind == videoTrack.kind
    })
    sender.replaceTrack(videoTrack)
  }).catch((error) => {
    console.log("unable to display media" + error)
  })
})

//Stop Screen Sharing
function stopScreenShare() {
  let videoTrack = myVideoStream.getVideoTracks()[0];
  var sender = currentPeer.getSenders().find(function (s) {
    return s.track.kind == videoTrack.kind;
  })
  sender.replaceTrack(videoTrack)
}

