import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Messages} from '/shared/messages.js';
import moment from 'moment';
import './messageList.html';

Template.messageList.onCreated(function () {
    const instance = this;
    instance.limit = new ReactiveVar(25);
    instance.autorun(() => {
        const user = Meteor.user();
        const limit = instance.limit.get();
        instance.subscribe('messages', user.profile.activeChannel, limit, function(){
            const listWrapper = document.querySelector('.message-list-wrapper');
            if(listWrapper && listWrapper.scrollTop === 0){
                listWrapper.scrollTop = listWrapper.scrollHeight;
            }
        });
    });
});

Template.messageList.helpers({
    messages() {
        return Messages.find({}, {sort: {date: -1}});
    },
    username() {
        const message = this;
        const user = Meteor.users.findOne(message.userId);
        return user.username;
    },
    formatDate() {
        const message = this;
        return moment(message.date).format('ddd MMM Do h:mm A')
    },
    canDelete() {
        const message = this;
        const userId = Meteor.userId();
        const isMessageOwner = userId === message.userId;
        const isAdmin = Roles.userIsInRole(userId, 'super-admin');
        return isAdmin || isMessageOwner;
    }
});

Template.messageList.events({
    'click [data-delete-message]'(event, instance) {
        const message = this;
        Meteor.call('removeMessage', message._id, (error, result) => {
            console.log(error, result);
        })
    },
    'click [data-copy-message]'(event, instance) {
        const message = this;
        navigator.clipboard.writeText(message.text);
    },
    'click [data-load-more]'(event, instance) {
        let limit = instance.limit.get();
        limit = limit + 25;
        instance.limit.set(limit);
    },



});