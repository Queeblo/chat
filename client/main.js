import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './accountsConfig.js';
import '../shared/accounts.js';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './signUp/signUp.js';
import './messageInput/messageInput.js'; 
import './messageList/messageList.js';
import './currentUserListItem/currentUserListItem.js';
import { Modal } from './modal/modal.js';
import './main.html';

Meteor.subscribe('users');

Template.userList.helpers({
  users() {
    return Meteor.users.find();
  }
});
