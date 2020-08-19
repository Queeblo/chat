import './userPopoverContent.html';
import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";

Template.userPopoverContent.events({

    'submit form'(event, instance) {
        event.preventDefault();
        const input = instance.find('input');
        const text = input.value;
        const date = new Date();
        const currentUser = Meteor.user();
        const user = this;
        input.value = '';
        const message = {
            text: text,
            userId: Meteor.userId(),
            date: date.toISOString(),
        };


        Meteor.call("addDirectMessage", message, user._id, function(error, result){
            if(error){
                console.log(error);
                alert(error.reason);
            }else{
                console.log(result);
            }
        });
    },
});