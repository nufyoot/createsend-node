var utils = require('./utils.js');

module.exports = function (createsend) {
  return {
    createsend: createsend,

    add: function (listId, subscriber, callback) {
      createsend.post('subscribers/' + listId, null, subscriber, callback);
    }
  };
}