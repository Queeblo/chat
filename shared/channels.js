import {Mongo} from 'meteor/mongo';
import {Messages} from "./messages";
import {Meteor} from "meteor/meteor";
export const Channels = new Mongo.Collection('channels');

Meteor.methods({
    updateUserProfile(profile){
        const userId = this.userId;
        if(!profile || !userId){
            throw new Meteor.Error('pants-not-found', "Can't find my pants");
        } 
        return Meteor.users.update(userId, {
            $set: {profile: profile}
        });
    },
    removeChannel(channelId) {
        const userId = this.userId;
        const isAdmin = Roles.userIsInRole(userId, 'super-admin');
        let removedMessageCount = 0;
        let removedChannelsCount = 0;
        if (isAdmin) {
             removedChannelsCount = Channels.remove({_id: channelId});
             removedMessageCount = Messages.remove({channelId: channelId});
            return {
                removedMessageCount: removedMessageCount,
                removedChannelsCount: removedChannelsCount,
            };
        } else {
            const publicChannel = Channels.findOne({type: 'public'});
             removedChannelsCount = Channels.remove({_id: channelId, userIds: userId});
            if (removedChannelsCount === 1) {
                removedMessageCount = Messages.remove({channelId: channelId});
                Meteor.users.update(userId, {$set: {'profile.activeChannel': publicChannel._id}});
            }
        }
        return {
            removedMessageCount: removedMessageCount,
            removedChannelsCount: removedChannelsCount,
        };
    },
    addChannel(channel) {
        const userId = this.userId;
        const isAdmin = Roles.userIsInRole(userId, 'super-admin');
        if (channel.name === '') {
            throw new Meteor.Error('pants-not-found', "Must provide channel name.");
        }
        if (isAdmin) {
            const channelId = Channels.insert(channel);
            Meteor.users.update(userId, {$set: {'profile.activeChannel': channelId}})
            return channelId;
        } else {
            //return Channels.remove({_id: channelId, userId: userId});
        }
    },
});