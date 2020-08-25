import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import './modal.html';

export const Modal = {
    templateName: new ReactiveVar(""),
    open(name) {
        $('#modal').modal('show');
        this.templateName.set(name);
    },
    close() {
        this.templateName.set("");
        $('#modal').modal('hide');
    }
};

Template.modal.helpers({
    template() {
        return Modal.templateName.get();
    }
});

Template.modal.events({
    'click [data-close]'(event, instance) {
        Modal.close();
    }
})