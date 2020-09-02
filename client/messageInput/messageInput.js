import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './messageInput.html';


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
      const date = new Date();
      const user = Meteor.user();
      input.value = '';
      const message = {
        text: text,
        userId: Meteor.userId(),
        date: date.toISOString(),
        channelId: user.profile.activeChannel
      };
      Meteor.call("addMessage", message, function(error, result){
        if(error){
          console.log(error);
          alert(error.reason);
        }else{
          console.log(result);
        }
      });
    },
    'click [data-file-button]'(event, instance){
      const input = instance.find('#file-input');
      const user = Meteor.user();
      input.addEventListener('change', (event) => {
        const fileList = event.target.files;
        const file = fileList[0];
        console.log(fileList);
        const reader = new FileReader();
        reader.addEventListener('load', (loadEvent) => {
          console.log(loadEvent);
          //img.src = event.target.result;
          const date = new Date();
          const message = {
            imgSrc: loadEvent.target.result,
            userId: Meteor.userId(),
            date: date.toISOString(),
            channelId: user.profile.activeChannel
          };
          Meteor.call("addMessage", message, function(error, result){
            if(error){
              console.log(error);
              alert(error.reason);
            }else{
              console.log(result);
            }
          });
        });
        reader.readAsDataURL(file);
      });
      input.click();
    },
  });