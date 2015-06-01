var utils = require('./utils.js');
var Campaign = require('./campaign.js');

module.exports = function (createsend) {
    return {
        createsend: createsend,

        create: function (clientId, campaign, callback) {
            var createsend = this.createsend;
            createsend.post('campaigns/' + clientId + '.json', null, campaign, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, new Campaign(createsend, result));
          });
        },

        createFromTemplate: function (clientId, campaign, callback) {
            var createsend = this.createsend;
            createsend.post('campaigns/' + clientId + '/fromtemplate.json', null, campaign, function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }

                callback(null, new Campaign(createsend, result));
            });
        },

        delete: function (campaignId, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.delete(callback);
        },

        getBounces: function (campaignId, filters, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getBounces(filters, callback);
        },

        getClicks: function (campaignId, filters, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getClicks(filters, callback);
        },

        getEmailClientUsage: function (campaignId, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getEmailClientUsage(callback);
        },

        getListsAndSegments: function (campaignId, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getListsAndSegments(callback);
        },

        getOpens: function (campaignId, filters, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getOpens(filters, callback);
        },

        getRecipients: function (campaignId, filters, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getRecipients(filters, callback);
        },

        getSpamComplaints: function (campaignId, filters, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getSpamComplaints(filters, callback);
        },

        getSummary: function (campaignId, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getSummary(callback);
        },

        getUnsubscribes: function (campaignId, filters, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.getUnsubscribes(filters, callback);
        },

        sendDraft: function (campaignId, sendDetails, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.send(sendDetails, callback);
        },

        sendPreview: function (campaignId, previewDetails, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.sendPreview(previewDetails, callback);
        },

        unschedule: function (campaignId, callback) {
            var campaign = new Campaign(this.createsend, campaignId);
            campaign.unschedule(callback);
        }
    };
}