var CreateSend = require('../createsend');

CreateSend.prototype.clientsList = function (callback) {
  this.execute('GET', 'clients', {}, callback);
};