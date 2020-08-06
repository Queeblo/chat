import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '/shared/messages.js';
import './messageList.html';

Template.messageList.onCreated(function () {
    const instance = this;
    instance.subscribe('messages');
  });
  
  Template.messageList.helpers({
    messages() {
      return Messages.find();
    },
  });