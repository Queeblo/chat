import './addChannelModal.html';
import { Modal } from '../modal/modal.js';
import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.addChannelModal.events({
    'submit form'(event, instance) {
        event.preventDefault();
        const input = instance.find('input');
        const text = input.value;
        const channel = {
            name: text,
            type: 'public',
        };
        Meteor.call("addChannel", channel, function(error, result){
            if(error){
                console.log(error);
                alert(error.reason);
            }else{
                console.log(result);
            }
        });
        Modal.close();
    },
});