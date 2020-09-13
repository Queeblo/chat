import {Messages} from '/shared/messages.js';
import moment from 'moment';

Meteor.methods({
    addDummyData: function(){
        const userId = 'vC6oMLfio5sEfQwMt';
        const channelId = '8yETjmXqSACmJyaWB';
        const date = moment();
        for(i = 0; i < 1000; i++){
            const text = `${i} message`;
            if(i % 10 === 0){
                date.subtract(1, "day");
            }
            const message = {
                userId: userId,
                channelId: channelId,
                date: date.toISOString(),
                text: text
            }
            Messages.insert(message);
        }
    },

    removeDummyData: function(){
        const removedMessages = Messages.remove({});
        console.log(`removeDummyData removed ${removedMessages}`)
    }

})