var CreateSend = require('../createsend');


/**
 * # .subscribersAdd(listId, subscriber, callback)
 *
 * Adds a subscriber to an existing subscriber list, including custom
 * field data if supplied. If the subscriber (email address) already
 * exists, their name and any custom field values are updated with
 * whatever is passed in.
 *
 * @name subscribersAdd
 * @param {String} ListId
 * @param {Object} subscriber details
 * @param {Function} callback
 * @see http://www.campaignmonitor.com/api/subscribers/#adding_a_subscriber
 * @api public
 */

CreateSend.prototype.subscribersAdd = function (listId, subscriber, callback) {
  this.execute('POST', 'subscribers/' + listId, subscriber, callback);
};