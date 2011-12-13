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

/**
 * # .subscriberUpdate(listId, email, subscriber, [callback])
 *
 * Updates any aspect of an existing subscriber, including
 * email address, name, and custom field data if supplied.
 *
 * @name subscriberUpdate
 * @param {String} ListId
 * @param {String} email
 * @param {Object} subscriber details
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/subscribers/#updating_a_subscriber
 * @api public
 */

CreateSend.prototype.subscriberUpdate = function (listId, email, subscriber, callback) {
  this.execute('PUT', 'subscribers/' + listId, { 'email': email }, subscriber, callback);
};

/**
 * # .subscribersImport(listId, subscribers, [callback])
 *
 * Allows you to add many subscribers to a subscriber list in one
 * API request, including custom field data if supplied. If a
 * subscriber (email address) already exists, their name and any
 * custom field values are updated with whatever is passed in.
 *
 * @name subscribersImport
 * @param {String} ListId
 * @param {Object} subscribers list
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/subscribers/#importing_subscribers
 * @api public
 */

CreateSend.prototype.subscribersImport = function (listId, subscribers, callback) {
  this.execute('POST', 'subscribers/' + listId + '/import', null, subscribers, callback);
};

};