var CreateSend = require('../createsend');

CreateSend.prototype.clientCreate = function (client, callback) {
  this.execute('POST', 'clients', null, client, callback);
};

CreateSend.prototype.clientDetails = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId, null, null, callback);
};

CreateSend.prototype.clientCampaigns = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId + '/campaigns', null, null, callback);
};

CreateSend.prototype.clientScheduled = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId + '/scheduled', null, null, callback);
};

CreateSend.prototype.clientDrafts = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId + '/drafts', null, null, callback);
};

CreateSend.prototype.clientLists = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId + '/lists', null, null, callback);
};

CreateSend.prototype.clientSegments = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId + '/segments', null, null, callback);
};

CreateSend.prototype.clientSuppressionList = function (clientId, paging, callback) {
  this.execute('GET', 'clients/' + clientId + '/suppressionlist', paging, null, callback);
};

CreateSend.prototype.clientTemplates = function (clientId, callback) {
  this.execute('GET', 'clients/' + clientId + '/templates', null, null, callback);
};

CreateSend.prototype.clientSetBasics = function (clientId, details, callback) {
  this.execute('PUT', 'clients/' + clientId + '/setbasics', null, details, callback);
};

CreateSend.prototype.clientSetAccess = function (clientId, details, callback) {
  this.execute('PUT', 'clients/' + clientId + '/setaccess', null, details, callback);
};

CreateSend.prototype.clientSetPaygBilling = function (clientId, details, callback) {
  this.execute('PUT', 'clients/' + clientId + '/setpaygbilling', null, details, callback);
};

CreateSend.prototype.clientSetMonthlyBilling = function (clientId, details, callback) {
  this.execute('PUT', 'clients/' + clientId + '/setmonthlybilling', null, details, callback);
};

CreateSend.prototype.clientDelete = function (clientId, callback) {
  this.execute('DELETE', 'clients/' + clientId, null, null, callback);
};