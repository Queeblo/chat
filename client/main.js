import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './messageInput/messageInput.js'; 
import './messageList/messageList.js';
import './modal/modal.js';
import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

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
  }
});

Template.body.helpers({
  registered() {
    const user = Meteor.user();
    if(user && user.registered){
      return true;
    } else {
      return false;
    }
  }
});