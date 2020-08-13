import { Meteor } from 'meteor/meteor';
/**
 * https://github.com/meteor-useraccounts/core/blob/master/Guide.md#form-fields-configuration
 */

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  pwd
]);

