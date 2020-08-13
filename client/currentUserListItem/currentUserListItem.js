import './currentUserListItem.html';

Template.currentUserListItem.events({
    'click [data-logout]'(event, instance){
      Meteor.logout();
    },
  })