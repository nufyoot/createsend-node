module.exports = Campaign;

function Campaign(createsend, campaignId) {
  this.createsend = createsend;
  this.campaignId = campaignId;
}

Campaign.prototype = {
  delete: function (callback) {
    this.createsend.delete('campaigns/' + this.campaignId, null, null, callback);
  },

  getBounces: function (filters, callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/bounces', filters, null, callback);
  },

  getClicks: function (filters, callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/clicks', filters, null, callback);
  },

  getEmailClientUsage: function (callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/emailclientusage', null, null, callback);
  },

  getListsAndSegments: function (callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/listsandsegments', null, null, callback);
  },

  getOpens: function (filters, callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/opens', filters, null, callback);
  },

  getRecipients: function (filters, callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/recipients', filters, null, callback);
  },

  getSpamComplaints: function (filters, callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/spam', filters, null, callback);
  },

  getSummary: function (callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/summary', null, null, callback);
  },

  getUnsubscribes: function (filters, callback) {
    this.createsend.get('campaigns/' + this.campaignId + '/unsubscribes', filters, null, callback);
  },

  send: function (sendDetails, callback) {
    this.createsend.post('campaigns/' + this.campaignId + '/send', null, sendDetails, callback);
  },

  sendPreview: function (previewDetails, callback) {
    this.createsend.post('campaigns/' + this.campaignId + '/sendpreview', null, previewDetails, callback);
  },

  unschedule: function (callback) {
    this.createsend.post('campaigns/' + this.campaignId + '/unschedule', null, null, callback);
  }
}