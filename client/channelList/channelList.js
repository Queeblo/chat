import { Channels } from '/shared/channels.js';
import './channelList.html';

Template.channelList.onCreated(function () {
    const instance = this;
    instance.subscribe('channels');
  });

  Template.channelList.helpers({
    channels() {
      return Channels.find();
    },
    active() {
        const channel = this;
        const user = Meteor.user();
        if(user && user.profile.activeChannel === channel._id){
            return "active";
        }
        return "";
    }
  });

  Template.channelList.events({
    'click [data-channel]'(event, instance) {
        const channel = this;
        const profile = {
            activeChannel: channel._id
        };
      Meteor.call("updateUserProfile", profile, function(error, result){
        if(error){
          console.log(error);
          alert(error.reason);
        }else{
          console.log(result);
        }
      });
    },
  });