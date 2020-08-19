import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Channels } from '../shared/channels.js';
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
    },
    addDirectMessage(message, messagedUserId){
        const userIds = [message.userId, messagedUserId];
        const channel = Channels.findOne({userIds: {$all: userIds}});
        let channelId = null;
        console.log(userIds, channel);
        if(!channel){
            const users = Meteor.users.find(
                {_id: {$in: userIds}},
                {fields: {username: 1}}
                ).fetch();
            console.log(users);
            let combinedUsernames = '';
            users.forEach(function (user){
                combinedUsernames = `${combinedUsernames} ${user.username}`;
            })
            channelId = Channels.insert({
                name: combinedUsernames,
                type: 'direct',
                userIds: userIds,
            })
        }else{
            channelId = channel._id;
        }
        Meteor.users.update(message.userId, {$set: {'profile.activeChannel': channelId}});
        message.channelId = channelId;
        const id = Messages.insert(message);
        return id;
    }
});