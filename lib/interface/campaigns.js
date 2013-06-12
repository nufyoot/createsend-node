var utils = require('./utils.js');
var Campaign = require('./campaign.js');

module.exports = function (createsend) {
  return {
    createsend: createsend,

    create: function (clientId, campaign, callback) {
      var createsend = this.createsend;
      createsend.post('campaigns/' + clientId, null, campaign, function (err, result) {
        if (err) {
          callback(err);
          return;
        }

        callback(null, new Campaign(createsend, result));
      });
    },

    createFromTemplate: function (clientId, campaign, callback) {
      var createsend = this.createsend;
      createsend.post('campaigns/' + clientId + '/fromtemplate', null, campaign, function (err, result) {
        if (err) {
          callback(err);
          return;
        }

        callback(null, new Campaign(createsend, result));
      });
    },

    getSummary: function (campaignId, callback) {
      var campaign = new Campaign(this.createsend, campaignId);
      campaign.getSummary(callback);
    },

    sendDraft: function (campaignId, sendDetails, callback) {
      var campaign = new Campaign(this.createsend, campaignId);
      campaign.send(sendDetails, callback);
    },

    sendPreview: function (campaignId, previewDetails, callback) {
      var campaign = new Campaign(this.createsend, campaignId);
      campaign.sendPreview(previewDetails, callback);
    }
  };
}