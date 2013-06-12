module.exports = Campaign;

function Campaign(createsend, campaignId) {
  this.createsend = createsend;
  this.campaignId = campaignId;
}

Campaign.prototype = {
  getEmailClientUsage: function (callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/emailclientusage', null, null, callback);
  },

  getSummary: function (callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/summary', null, null, callback);
  },

  send: function (sendDetails, callback) {
    this.createsend.post('campaigns/' + this.campaignId + '/send', null, sendDetails, callback);
  },

  sendPreview: function (previewDetails, callback) {
    this.createsend.post('campaigns/' + this.campaignId + '/sendpreview', null, previewDetails, callback);
  }
}