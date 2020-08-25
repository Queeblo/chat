import './addChannelModal.html';
import { Modal } from '../modal/modal.js';
import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.addChannelModal.events({
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
});