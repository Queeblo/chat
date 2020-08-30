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
        if (isAdmin) {
            const removedChannelsCount = Channels.remove({_id: channelId});
            const removedMessageCount = Messages.remove({channelId: channelId});
            return {
                removedMessageCount: removedMessageCount,
                removedChannelsCount: removedChannelsCount,
            };
        } else {
            Channels.update({_id: channelId},{
                $pull: {userIds: userId},
                $push: {inactiveUserIds: userId}
            });
            const publicChannel = Channels.findOne({type: 'public'});
            Meteor.users.update(userId, {$set: {'profile.activeChannel': publicChannel._id}});
            //return Channels.remove({_id: channelId, userId: userId});
        }
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