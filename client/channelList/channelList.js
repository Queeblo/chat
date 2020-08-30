import { Channels } from '/shared/channels.js';
import { Modal } from "../modal/modal";
import '../addChannelModal/addChannelModal.js';
import './channelList.html';

Template.channelList.onCreated(function () {
    const instance = this;
    instance.subscribe('channels');
});

Template.channelList.helpers({
    publicChannels() {
        return Channels.find({type: 'public'});
    },
    directChannels() {
        return Channels.find({type: 'direct'});
    },
    active() {
        const channel = this;
        const user = Meteor.user();
        if (user && user.profile.activeChannel === channel._id) {
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

        Meteor.call("updateUserProfile", profile, function (error, result) {
            if (error) {
                console.log(error);
                alert(error.reason);
            } else {
                //console.log(result);
            }
        });
    },
    'click [data-delete-channel]'(event, instance) {
        event.stopPropagation();
        const channel = this;
        const channelId = channel._id;
        console.log(channel);

        Meteor.call("removeChannel", channelId, function (error, result) {
            if (error) {
                console.log(error);
                alert(error.reason);
            } else {
                const removedText = `Messages removed: ${result.removedMessageCount}`
                console.log(result);
                alert(removedText)
            }
        })
    },

    'click [data-add-channel]'(event, instance) {
        event.stopPropagation();
        Modal.open('addChannelModal');
        // Meteor.call("addChannel", function (error, result) {
        //     if (error) {
        //         console.log(error);
        //         alert(error.reason);
        //     } else {
        //         //console.log(result);
        //     }
        // })
    },

});