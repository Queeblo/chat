import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Messages } from '/shared/messages.js';
import './main.html';

Template.messageList.onCreated(function () {
  const instance = this;
});
//a
Template.messageList.helpers({
  messages() {
    return Messages.find();
  },
});

Template.messageList.events({
  'click button'(event, instance) {
    const newVal = instance.counter.get() + 1;
    instance.counter.set(newVal);
  },
});

Template.messageInput.events({
  'submit form'(event, instance) {
    event.preventDefault();
    const input = instance.find('input');
    const text = input.value;
    Messages.insert({text: text});
    input.value = '';

  },
});