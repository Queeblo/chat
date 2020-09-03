import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './messageInput.html';

function addMessage(content) {
  const date = new Date();
  const user = Meteor.user();
  const message = Object.assign({
    userId: Meteor.userId(),
    date: date.toISOString(),
    channelId: user.profile.activeChannel
  }, content);
  console.log(message);
  Meteor.call("addMessage", message, function(error, result){
    if(error){
      console.log(error);
      alert(error.reason);
    }else{
      console.log(result);
      const listWrapper = document.querySelector('.message-list-wrapper');
      listWrapper.scrollTop = listWrapper.scrollHeight;
    }
  });
}

Template.messageInput.onCreated(function () {
    const instance = this;
    instance.hasValue = new ReactiveVar(false);
  });
  
  Template.messageInput.helpers({
    disabled(){
      const instance = Template.instance();
      if(instance.hasValue.get()){
        return '';
      }else{
        return 'disabled';
      }
    }
  })
  
  Template.messageInput.events({
    'keyup input'(event, instance){
      const value = event.target.value;
      if(value){
        instance.hasValue.set(true);
      } else{
        instance.hasValue.set(false);
      }
    },
    'submit form'(event, instance) {
      event.preventDefault();
      const input = instance.find('input');
      const text = input.value;
      input.value = '';
      addMessage({text: text});
    },
    'click [data-file-button]'(event, instance){
      const input = instance.find('#file-input');
      input.addEventListener('change', (event) => {
        const fileList = event.target.files;
        const file = fileList[0];
        console.log(fileList);
        const reader = new FileReader();
        reader.addEventListener('load', (loadEvent) => {
          console.log(loadEvent);
          const imgSrc = loadEvent.target.result;
          addMessage({imgSrc: imgSrc});
        });
        reader.readAsDataURL(file);
      });
      input.click();
    },
  });