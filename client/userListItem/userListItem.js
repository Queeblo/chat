import {Blaze} from "meteor/blaze";
import '../userPopoverContent/userPopoverContent.js';
import './userListItem.html';

Template.userListItem.onRendered(function () {
    const user = this.data;
    const selector = `#${user._id}`;

    $(selector).on('inserted.bs.popover', function () {
        const parentNode = document.getElementById(`popover-${user._id}`);
        Blaze.renderWithData(Template.userPopoverContent, user, parentNode);
    });

    $(selector).on('shown.bs.popover', function () {
        const clickListener = function(event) {
            if(event.target.closest('.popover')) return;
            $(selector).popover('hide');
            document.removeEventListener("click", clickListener);
        };
        document.addEventListener("click", clickListener);
    });

    $(selector).popover({
        content: `<div id="popover-${user._id}"></div>`,
        title: user.username,
        placement: "left",
        html: true,
    });
});