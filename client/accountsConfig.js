import { Modal } from './modal/modal.js';


AccountsTemplates.configure({
    texts: {
        title: {
        signIn: "",
        signUp: "",
        }
    },
    onSubmitHook: function(error, state){
        if (!error) {
         Modal.close();
        }
    }
});
