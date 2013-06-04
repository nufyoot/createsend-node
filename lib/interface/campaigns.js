var utils = require('./utils.js');

module.exports = function (createsend) {
  return {
    createsend: createsend,

    create: function (clientId, campaign, callback) {
      createsend.post('campaigns/' + clientId, null, campaign, callback);
    },

    createFromTemplate: function (clientId, campaign, callback) {
      createsend.post('campaigns/' + clientId + '/fromtemplate', null, campaign, callback);
    }
  };
}