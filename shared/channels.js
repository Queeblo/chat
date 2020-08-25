import {Mongo} from 'meteor/mongo';
import {Messages} from "./messages";
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
        console.log('log');
        const userId = this.userId;
        const isAdmin = Roles.userIsInRole(userId, 'super-admin');
        if (isAdmin) {
            return Channels.remove({_id: channelId});
        } else {
            //return Channels.remove({_id: channelId, userId: userId});
        }
    },
});