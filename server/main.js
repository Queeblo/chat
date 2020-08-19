import { Meteor } from 'meteor/meteor';
import { Messages } from '/shared/messages.js';
import { Channels } from '../shared/channels.js';
import { Accounts } from 'meteor/accounts-base';
import '../shared/accounts.js';

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
      defaultChannels.forEach(function(channel){
          console.log(channel);
          Channels.insert(channel);
      });
    
  }
  //Channels.remove({})
  console.log(Channels.find().fetch())
});

Meteor.methods({
  getConnectionId(){
    const userCount = Meteor.users.find().count();
    const connectionId = this.connection.id;
    return {
      username: `user-${userCount}`,
      connectionId: connectionId

    };
  },
  register(data){
    console.log(data);
    const userId = this.userId;
    if(userId){
      Accounts.setUsername(userId, data.username);
      Accounts.setPassword(userId, data.password);
    }
  }
})

Meteor.publish('messages', function (channelId) {
  return Messages.find({channelId: channelId});
});

Meteor.publish('users', function(){
  return Meteor.users.find({}, {fields: {services: 0}});
});

Meteor.publish('channels', function () {
  return Channels.find({});
});

Accounts.onCreateUser((options, user) => {
  const defaultChannel = Channels.findOne({name: "General"});
  user.profile = {
    activeChannel: defaultChannel._id,
  };
  return user;
});
