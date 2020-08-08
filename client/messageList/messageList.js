import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Messages } from '/shared/messages.js';
import moment from 'moment';
import './messageList.html';

Template.messageList.onCreated(function () {
    const instance = this;
    instance.subscribe('messages');
  });
  
  Template.messageList.helpers({
    messages() {
      return Messages.find();
    },
    username() {
      const message = this;
      const user = Meteor.users.findOne(message.userId);
      return user.username;
    },
    formatDate() {
      const message = this;
      return moment(message.date).format('ddd MMM Do h:mm A')
    }
  });

  Template.messageList.events({
    'click [data-delete-message]'(event, instance){
      const message = this;
      Meteor.call('removeMessage', message._id)
    },
  });