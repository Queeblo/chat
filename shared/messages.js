import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
export const Messages = new Mongo.Collection('messages');


Meteor.methods({
    addMessage(message){
        if(!message || message.text === ''){
            throw new Meteor.Error('pants-not-found', "Can't find my pants");
        } 
        //console.log(typeof message.text);
        const id = Messages.insert(message);
        console.log(`addMessage: ${message.userId} ${message.text}`);
    },
    removeMessage(messageId){
        const userId = this.userId;
        return Messages.remove({_id: messageId, userId: userId});
    }
});