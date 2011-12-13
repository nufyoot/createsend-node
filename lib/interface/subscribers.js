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

/**
 * # .subscriberDetails(listId, subscribers, [callback])
 *
 * Retrieves a subscriber's details including their email address,
 * name, active/inactive state, and any custom field data.
 *
 * @name subscriberDetails
 * @param {String} ListId
 * @param {String} email
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/subscribers/#getting_subscriber_details
 * @api public
 */

CreateSend.prototype.subscriberDetails = function (listId, email, callback) {
  this.execute('GET', 'subscribers/' + listId, { 'email': email }, null, callback);
};

/**
 * # .subscriberHistory(listId, email, [callback])
 *
 * Retrieves a list of campaigns and or autoresponder emails,
 * in response to which a subscriber has made some trackable action.
 *
 * @name subscriberHistory
 * @param {String} ListId
 * @param {String} email
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/subscribers/#getting_subscriber_history
 * @api public
 */

CreateSend.prototype.subscriberHistory = function (listId, email, callback) {
  this.execute('GET', 'subscribers/' + listId + '/history', { 'email': email }, null, callback);
};

};