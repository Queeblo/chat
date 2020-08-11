import './signUp.html';
import { Modal } from '../modal/modal.js';

Template.signUp.events({
    'submit form'(event, instance) {
        event.preventDefault();
        const username = instance.find('#username').value;
        const password = instance.find('#password').value;
        const data = {
            username: username,
            password: password
        };
        Meteor.call("register", data, function(error, result){
          if(error){
            console.log(error);
            alert(error.reason);
          }else{
            console.log(result);
            Modal.close();
          }
        });
      }
  })