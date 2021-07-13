# Microsoft-Teams-clone

A interactive web application that helps users connect with each other and form bonds via real-time virtual meetings. Despite being forced to stay at home due to on-going pandemic, this application helps us to CONNECT with our friends, relative and hence helping us maintain our social network. 

## Screenshots:
![oneononegood](https://user-images.githubusercontent.com/59930751/125209622-b8aa6780-e2b7-11eb-8aa7-a093e0da3ec4.png)
  ![screenshare](https://user-images.githubusercontent.com/59930751/125209634-c95add80-e2b7-11eb-95e1-b524ea588f8e.png)
  ![videonofffinal](https://user-images.githubusercontent.com/59930751/125209640-d972bd00-e2b7-11eb-87d7-78e8f5b00ee5.png)
  ![multiuser](https://user-images.githubusercontent.com/59930751/125209646-e42d5200-e2b7-11eb-8ada-519d1a89e449.png)



## Technologies used

* HTML, CSS, JavaScript
* Bootstrap Framework
* Node express server
* WebRTC
* Peer JS
* Socket.io
* Simple-peer
* UUID
* moment Module

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
| Sprint 2 (Build)  | Week 2 | Implemented Welcome Page. <br />Join Video Call Feature, Leave Meeting Button |
|                   | Week 3 | Integrated Video Call with PeerJs. <br />Functionalities added -  <br />Mute/Unmute Mic,Start/Stop Video, Invite Via Link <br />Implemented Game Zone Page |
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

![image-20210713112809133](C:\Users\Raksha\AppData\Roaming\Typora\typora-user-images\image-20210713112809133.png)



