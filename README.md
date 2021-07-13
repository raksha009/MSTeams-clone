# Microsoft-Teams-clone

A interactive web application that helps users connect with each other and form bonds via real-time virtual meetings. Despite being forced to stay at home due to on-going pandemic, this application helps us to CONNECT with our friends, relative and hence helping us maintain our social network. 


## Technologies used

* HTML, CSS, JavaScript and
* Bootstrap Framework - for frontend
* NodeJs, express server for backend
* WebRTC and
* Peer JS  and
* Socket.io  and
* Simple-peer -  for establishing realtime connection on videocall/chat with peers/relatives
(PeerJs wraps the browser's WebRTC implementation to provide an easy to use peer to peer connection API)
* UUID Module - to create private video call rooms via generating unique URL
* Moment Module - helps in displaying the current time in our application  (works better when working on apps hosted on localhost)

## Features
- Video Call with multiple users

- Invite via link to share directly

- Users can Mute/Unmute themselves 

- Users can Start/Stop their own Video

- Users can Share their Screen

- Chat feature where users could:

  *  Send and view messages

  * Start the conversation before the meeting

  * Continue the conversation after the meeting 

    with all messages saved until the user leaves the room.

- Leave from meeting feature

- Game Zone for users to rest and have some fun time

- Interactive and easy to use user-friendly UI targeting non-tech savvy users.

## Timeline

### Agile Methodology Implementation

| Sprints           | Weeks  | Work Description(Bugs And Deliverables)                      |
| :---------------- | :----: | :----------------------------------------------------------- |
| Sprint 1 (Design) | Week 1 | Learned Backend Technologies. <br />Explored PeerJS, WebRTC, Socket.io etc. <br />Designed a basic solution for the challenge. |
| Sprint 2 (Build)  | Week 2 | Implemented Welcome Page. <br />Join Video Call Feature, Leave Meeting Button <br /> Received feedback to improve UI and add more features|
|                   | Week 3 | Integrated Video Call with PeerJs. <br />Functionalities added - Mute/Unmute Mic,Start/Stop Video, Invite Via Link <br />Implemented Game Zone Page <br /> Received feedback to add chat funtionality|
| Sprint 3 (Adapt)  | Week 4 | Implemented Chat Rooms <br />Share Screen Functionality added  <br />Hosted the website on Heroku |



## Platform Used to deploy the Web Application:

Heroku.com

Deployed app link:  https://ms-teams--clone.herokuapp.com/

## Setup

#### <u>LOCALLY ON YOUR SYSTEM</u>

###### Clone
Clone this repo to your local machine using [this link](https://github.com/raksha009/MSTeams-clone.git)
```
git clone https://github.com/raksha009/MSTeams-clone.git
```
```
cd MSTeams-clone
```
###### Server Setup 

```
npm install
```
Make changes 

```
nodemon server.js
```
Open [this link](http://localhost:3000/)



#### OR

#### <u>RUN THE ALREADY DEPLOYED APPLICATION</u>

Link:  
  https://ms-teams--clone.herokuapp.com/
<br />Steps:

Open the link in your browser and we are good to go.

Note : To redeploy on Heroku after making changes on your localhost - 

Change the values of host and port in script.js. The port on Heroku is 443 by-default and host is the name of the site where your Heroku application gets deployed.

![image-20210713112809133](https://github.com/raksha009/MSTeams-clone/blob/main/Screenshots/changesWhenRe-deployed.png)


**Also, while running, if any feature doesn't work, plz change https to http(as https require paid security version) and it would work.**

## Screenshots:
![welcome](https://github.com/raksha009/MSTeams-clone/blob/main/Screenshots/welcomepage.png)
![VideoCall](https://github.com/raksha009/MSTeams-clone/blob/main/Screenshots/VideoCall.png)
![EntryChat](https://github.com/raksha009/MSTeams-clone/blob/main/Screenshots/EntryChatRoom.png)
![MainChat](https://github.com/raksha009/MSTeams-clone/blob/main/Screenshots/MainChatRoom.png)
![FunZone](https://github.com/raksha009/MSTeams-clone/blob/main/Screenshots/FunZone.png)


