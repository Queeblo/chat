import { Meteor } from 'meteor/meteor';
import { Messages } from '/shared/messages.js';
import { Accounts } from 'meteor/accounts-base';
import '../shared/accounts.js';

Meteor.startup(() => {
  const messageCount = Messages.find().count();
  if (messageCount === 0) {
    //Messages.insert({text: "test"});
  }
  // Messages.remove({})
  //console.log(Messages.find().fetch())
});

Meteor.onConnection(function(connection){
  //console.log(connection);
  connection.onClose(function(){
    //console.log(connection.id)
  })
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

Meteor.publish('messages', function () {
  return Messages.find({});
});

Meteor.publish('users', function(){
  return Meteor.users.find({}, {fields: {services: 0}});
});