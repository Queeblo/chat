import {Mongo} from 'meteor/mongo';
export const Channels = new Mongo.Collection('channels');

Meteor.methods({
    updateUserActiveChannel(profile){
        const userId = this.userId;
        if(!channelId || !userId){
            throw new Meteor.Error('pants-not-found', "Can't find my pants");
        } 
        // return Meteor.users.update(userId, {
        //     $set: {profile: profile}
        // });
    },
});