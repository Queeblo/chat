import { Meteor } from 'meteor/meteor';
import { Messages } from '/shared/messages.js';
import { Accounts } from 'meteor/accounts-base';

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
  }
})

Meteor.publish('messages', function () {
  return Messages.find({});
});

Meteor.publish('users', function(){
  return Meteor.users.find({}, {fields: {services: 0}});
});