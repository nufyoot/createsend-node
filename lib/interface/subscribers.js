var CreateSend = require('../createsend');


/**
 * # .subscriberAdd(listId, subscriber, [callback])
 *
 * Adds a subscriber to an existing subscriber list, including custom
 * field data if supplied. If the subscriber (email address) already
 * exists, their name and any custom field values are updated with
 * whatever is passed in.
 *
 * @name subscriberAdd
 * @param {String} ListId
 * @param {Object} subscriber details
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/subscribers/#adding_a_subscriber
 * @api public
 */

CreateSend.prototype.subscriberAdd = function (listId, subscriber, callback) {
  this.execute('POST', 'subscribers/' + listId, null, subscriber, callback);
};
};