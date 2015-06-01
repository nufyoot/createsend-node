module.exports = Campaign;

function Campaign(createsend, campaignId) {
    this.createsend = createsend;
    this.campaignId = campaignId;
}

Campaign.prototype = {
    delete: function (callback) {
        this.createsend.delete('campaigns/' + this.campaignId + '.json', null, null, callback);
    },

    getBounces: function (filters, callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/bounces.json', filters, null, callback);
    },

    getClicks: function (filters, callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/clicks.json', filters, null, callback);
    },

    getEmailClientUsage: function (callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/emailclientusage.json', null, null, callback);
    },

    getListsAndSegments: function (callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/listsandsegments.json', null, null, callback);
    },

    getOpens: function (filters, callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/opens.json', filters, null, callback);
    },

    getRecipients: function (filters, callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/recipients.json', filters, null, callback);
    },

    getSpamComplaints: function (filters, callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/spam.json', filters, null, callback);
    },

    getSummary: function (callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/summary.json', null, null, callback);
    },

    getUnsubscribes: function (filters, callback) {
        this.createsend.get('campaigns/' + this.campaignId + '/unsubscribes.json', filters, null, callback);
    },

    send: function (sendDetails, callback) {
        this.createsend.post('campaigns/' + this.campaignId + '/send.json', null, sendDetails, callback);
    },

    sendPreview: function (previewDetails, callback) {
        this.createsend.post('campaigns/' + this.campaignId + '/sendpreview.json', null, previewDetails, callback);
    },

    unschedule: function (callback) {
        this.createsend.post('campaigns/' + this.campaignId + '/unschedule.json', null, null, callback);
    }
}