
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
let userList = document.getElementById('users');
let leaveBtn = document.querySelector("#leave-btn");
let inputElem = document.querySelector("#msg");

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

let connectedUsers = []

const socket = io()
 
let liElem = document.createElement('li')
liElem.innerText = username;
userList.appendChild(liElem);

roomName.innerText = room;


// Join chatroom
socket.emit('join-room',room, username );

// console.log(room, username)
socket.on('user-connected', userId => {
  let liElem = document.createElement('li')
  liElem.innerText = userId;
  userList.appendChild(liElem);
  connectedUsers.push(userId)
  socket.emit("add-us", username);
})

socket.on("add-others", adminId => {
  userList = document.querySelector("#users");
  let arr = userList.querySelectorAll("li");
  for(let i=0; i<arr.length; i++){
   console.log( arr[i]);
   if(arr[i].innerText == adminId){
      return;
   }
  }
  connectedUsers.push(adminId);
  let liElem = document.createElement('li')
  liElem.innerText = adminId;
  userList.appendChild(liElem);
  console.log(adminId);
})


leaveBtn.addEventListener("click", function(){
  socket.emit("disconnected", username)

})

socket.on("user-disconnected", id => {
  if(connectedUsers.includes(id)){
    userList = document.querySelector("#users");
    let arr = userList.querySelectorAll("li");
    for(let i=0; i<arr.length; i++){
     if(arr[i].innerText == id){
        userList.removeChild(arr[i]);
     }
    }
    connectedUsers = connectedUsers.filter(uid => uid != id);
  }
})

inputElem.addEventListener("keydown", function(e){
  if(e.key == "Enter" && inputElem.value.trim() != ""){
    let inputValue = inputElem.value;
    addMessage(inputValue);
    socket.emit("new message", inputValue, username);
    inputElem.value= "";
  }
})

chatForm.addEventListener('submit', function(e){
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }

  let inputValue = inputElem.value;
  addMessage(inputValue);
  socket.emit("new message", inputValue, username);
  inputElem.value= "";
});




function addMessage(message, id){
  let userId = id || username;
  let messageContainer = document.querySelector(".chat-messages");
  let messageDiv = document.createElement("div");
  messageDiv.setAttribute("class", "message");
  let userTag = document.createElement("p");
  userTag.setAttribute("class", "meta");
  userTag.innerText = userId;

  let msgTag = document.createElement("p");
  msgTag.setAttribute("class", "text");
  msgTag.innerText = message; 

  messageDiv.appendChild(userTag);
  messageDiv.appendChild(msgTag) ;
  messageContainer.appendChild(messageDiv); 
}

socket.on("user-message", (message, id) =>{
  addMessage(message, id);
})



// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   console.log([room.username])
//   outputRoomName(room.room);
//   outputUsers([room.username]);
// });

// // Message from server
// socket.on('message', (message) => {
//   console.log(message);
//   outputMessage(message);

//   // Scroll down
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // dlt user
// socket.on('user-disconnected', (message, userId) =>{
//   leavemessage(message, userId);
// })


// Message submit
// chatForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // Get message text
//   console.log(inputElem, e, e.target, e.target.elements)
//   let msg = e.target.elements.msg.value;
// // console.log(msg)
//   msg = msg.trim();
// // console.log(msg)
//   if (!msg) {
//     return false;
//   }
// console.log(msg)
//   // Emit message to server
//   socket.emit('new message', msg);
// console.log(msg)
//   // Clear input
//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();
// });

// // Output message to DOM
// function outputMessage(message) {
//   const div = document.createElement('div');
//   div.classList.add('message');
//   const p = document.createElement('p');
//   p.classList.add('meta');
//   p.innerText = message.username;
//   p.innerHTML += `<span>${message.time}</span>`;
//   div.appendChild(p);
//   const para = document.createElement('p');
//   para.classList.add('text');
//   para.innerText = message.text;
//   div.appendChild(para);
//   document.querySelector('.chat-messages').appendChild(div);
// }

// function leavemessage(message, userId) {
//  let arr = userList.querySelectorAll('li');
//  for(let i=0; i<arr.length; i++){
//   if(arr[i].innerText == userId){
//     arr[i].remove();
//   }
//  }
//   const div = document.createElement('div');
//   div.classList.add('message');
//   const p = document.createElement('p');
//   p.classList.add('meta');
//   p.innerText = userId;
//   // p.innerHTML += `<span>${message.time}</span>`;
//   div.appendChild(p);
//   const para = document.createElement('p');
//   para.classList.add('text');
//   para.innerText = message;
//   div.appendChild(para);
//   document.querySelector('.chat-messages').appendChild(div);
// }

// // Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user;
//     userList.appendChild(li);
//   });
// }





// //Prompt the user before leave chat room
// document.getElementById('leave-btn').addEventListener('click', () => {
//   const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//   if (leaveRoom) {
//     window.location = '../../views/chatroom.ejs';
//   } else {
//   }
// });
