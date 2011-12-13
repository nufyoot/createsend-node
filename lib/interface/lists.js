var CreateSend = require('../createsend');


/**
 * # .listCreate(ClientId, ListDetails, [callback])
 *
 * Create a new list in which subscribers can be added or imported.
 *
 * @name listCreate
 * @param {String} ClientId
 * @param {Object} ListDetails
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/lists/#creating_a_list
 * @api public
 */

CreateSend.prototype.listCreate = function (clientId, details, callback) {
  this.execute('POST', 'lists/' + clientId, null, details, callback);
};

/**
 * # .listDelete(ListId, [callback])
 *
 * Deletes a subscriber list from your account.
 *
 * @name listDelete
 * @param {String} ListId
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/lists/#deleting_a_list
 * @api public
 */

CreateSend.prototype.listDelete = function (listId, callback) {
  this.execute('DELETE', 'lists/' + listId, null, null, callback);
};