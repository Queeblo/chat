import { Meteor } from 'meteor/meteor';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './messageInput/messageInput.js'; 
import './messageList/messageList.js';
import './main.html';

Meteor.startup(function(){
  Meteor.call('getConnectionId', function(error, userInfo){
    if(!Meteor.userId()){
      Accounts.createUser({username: userInfo.username, password: userInfo.connectionId})

    }
  })
});

Meteor.subscribe('users');


Template.userList.helpers({
  users() {
    return Meteor.users.find();
  },
});