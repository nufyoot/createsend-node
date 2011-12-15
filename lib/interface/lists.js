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

CreateSend.prototype.listDetails = function (listId, callback) {
  this.execute('GET', 'lists/' + listId, null, null, callback);
};

CreateSend.prototype.listStats = function (listId, callback) {
  this.execute('GET', 'lists/' + listId + '/stats', null, null, callback);
};

CreateSend.prototype.listCustomFields = function (listId, callback) {
  this.execute('GET', 'lists/' + listId + '/customfields', null, null, callback);
};

CreateSend.prototype.listSegments = function (listId, callback) {
  this.execute('GET', 'lists/' + listId + '/segments', null, null, callback);
};

CreateSend.prototype.listActive = function (listId, paging, callback) {
  this.execute('GET', 'lists/' + listId + '/active', paging, null, callback);
};

CreateSend.prototype.listUnsubscribed = function (listId, paging, callback) {
  this.execute('GET', 'lists/' + listId + '/unsubscribed', paging, null, callback);
};

CreateSend.prototype.listBounced = function (listId, paging, callback) {
  this.execute('GET', 'lists/' + listId + '/bounced', paging, null, callback);
};

CreateSend.prototype.listDeleted = function (listId, paging, callback) {
  this.execute('GET', 'lists/' + listId + '/deleted', paging, null, callback);
};

CreateSend.prototype.listUpdate = function (listId, details, callback) {
  this.execute('PUT', 'lists/' + listId, null, details, callback);
};

CreateSend.prototype.listFieldCreate = function (listId, details, callback) {
  this.execute('POST', 'lists/' + listId + '/customfields', null, details, callback);
};

CreateSend.prototype.listFieldUpdate = function (listId, fieldKey, details, callback) {
  this.execute('PUT', 'lists/' + listId + '/customfields/' + fieldKey + '/options', null, details, callback);
};

CreateSend.prototype.listFieldDelete = function (listId, fieldKey, callback) {
  this.execute('DELETE', 'lists/' + listId + '/customfields/' + fieldKey, null, details, callback);
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