var CreateSend = require('../createsend');

CreateSend.prototype.subscribersAdd = function (listId, subscriber, callback) {
  this.execute('POST', 'subscribers/' + listId, subscriber, callback);
};