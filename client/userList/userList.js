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



  