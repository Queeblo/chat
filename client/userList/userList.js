import { Blaze } from 'meteor/blaze'
import './userList.html';

Template.userList.onCreated(function () {
    const instance = this;
    instance.subscribe('users', function(){
        const users = Meteor.users.find().fetch();
        console.log(users);
    });
});

Template.userList.helpers({
    onlineUsers() {
        return Meteor.users.find({
            "status.online": true
        });
    },
    offlineUsers(){
        return Meteor.users.find({
            "status.online": false
        });
    },
    onlineCount(){
        return Meteor.users.find({
            "status.online": true
        }).count();
    },
    offlineCount(){
        return Meteor.users.find({
            "status.online": false
        }).count();
    }
});


Template.userListItem.onRendered(function () {
    const user = this.data;
    const selector = `#${user._id}`;
    const userATagElement = $(selector);
    const content = Blaze.toHTMLWithData(Template.userPopoverContent, user);
    
    console.log(user);
    userATagElement.popover({
        content: content,
        title: user.username,
        placement: "left",
        html: true,
        sanitize: false,
    });
});
  