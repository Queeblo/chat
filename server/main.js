import {Meteor} from 'meteor/meteor';
import {Messages} from '/shared/messages.js';
import {Channels} from '../shared/channels.js';
import {Accounts} from 'meteor/accounts-base';
import '../shared/accounts.js';
// https://atmospherejs.com/alanning/roles#roles-docs
const defaultChannels = [
    {
        name: "General",
        type: "public"
    },
    {
        name: "Off-Topic",
        type: "public"
    }
];

Meteor.startup(() => {
    const channelCount = Channels.find().count();
    if (channelCount === 0) {
        defaultChannels.forEach(function (channel) {
            console.log(channel);
            Channels.insert(channel);
        });

    }
    //Channels.remove({})
    console.log(Channels.find().fetch())
    Roles.createRole('super-admin', {unlessExists: true})
    const superAdmin = Meteor.users.findOne({username: 'HankHill'});
    if(superAdmin){
        console.log(Roles.userIsInRole(superAdmin._id, 'super-admin'));
    }
});

Meteor.methods({
    getConnectionId() {
        const userCount = Meteor.users.find().count();
        const connectionId = this.connection.id;
        return {
            username: `user-${userCount}`,
            connectionId: connectionId

        };
    },
    register(data) {
        console.log(data);
        const userId = this.userId;
        if (userId) {
            Accounts.setUsername(userId, data.username);
            Accounts.setPassword(userId, data.password);
        }
    }
})

Meteor.publish('messages', function (channelId) {
    return Messages.find({channelId: channelId});
});

Meteor.publish('users', function () {
    return Meteor.users.find({}, {fields: {services: 0}});
});

Meteor.publish('channels', function () {
    const userId = this.userId;
    console.log(userId);
    // {type: 'public'}
    //{userIds: userId}
    return Channels.find({$or: [{type: 'public'}, {userIds: userId}]});
});

Meteor.publish(null, function () {
    if (this.userId) {
        return Meteor.roleAssignment.find({ 'user._id': this.userId });
    } else {
        this.ready()
    }
})


Accounts.onCreateUser((options, user) => {
    const defaultChannel = Channels.findOne({name: "General"});
    user.profile = {
        activeChannel: defaultChannel._id,
    };
    if (user.username === 'HankHill') {
        Roles.addUsersToRoles(user._id, 'super-admin');
    }
    ;
    return user;
});
