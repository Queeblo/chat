import { Meteor } from 'meteor/meteor';
import {Messages} from '/shared/messages.js';

Meteor.startup(() => {
  const messageCount = Messages.find().count();
  if (messageCount === 0) {
    Messages.insert({text: "test"});
  }
  console.log(Messages.find().fetch())
});
