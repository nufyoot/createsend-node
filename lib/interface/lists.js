var utils   = require('./utils.js');
var List    = require('./list.js');

module.exports = Lists;

function Lists(createsend) {
    this.createsend = createsend;
}

Lists.prototype = {
    activateWebhook: function (listId, webhookId, callback) {
        new List(this.createsend, listId).activateWebhook(webhookId, callback);
    },

    createCustomField: function (listId, details, callback) {
        new List(this.createsend, listId).createCustomField(details, callback);
    },

    createList: function (clientId, details, callback) {
        var createsend = this.createsend;
        createsend.post('lists/' + clientId + '.json', null, details, function (err, listId) {
            if (err) { return callback(err); }
            callback(null, new List(createsend, listId));
        });
    },

    createWebhook: function (listId, details, callback) {
        new List(this.createsend, listId).createWebhook(details, callback);
    },

    deactivateWebhook: function (listId, webhookId, callback) {
        new List(this.createsend, listId).deactivateWebhook(webhookId, callback);
    },

    deleteCustomField: function (listId, key, callback) {
        new List(this.createsend, listId).deleteCustomField(key, callback);
    },

    deleteList: function (listId, callback) {
        new List(this.createsend, listId).delete(callback);
    },

    deleteWebhook: function (listId, webhookId, callback) {
        new List(this.createsend, listId).deleteWebhook(webhookId, callback);
    },

    getActiveSubscribers: function (listId, filter, callback) {
        new List(this.createsend, listId).getActiveSubscribers(filter, callback);
    },

    getBouncedSubscribers: function (listId, filter, callback) {
        new List(this.createsend, listId).getBouncedSubscribers(filter, callback);
    },

    getCustomFields: function (listId, callback) {
        new List(this.createsend, listId).getCustomFields(callback);
    },

    getDeletedSubscribers: function (listId, filter, callback) {
        new List(this.createsend, listId).getDeletedSubscribers(filter, callback);
    },

    getListDetails: function (listId, callback) {
        new List(this.createsend, listId).getDetails(callback);
    },

    getSegments: function (listId, callback) {
        new List(this.createsend, listId).getSegments(callback);
    },

    getStats: function (listId, callback) {
        new List(this.createsend, listId).getStats(callback);
    },

    getUnconfirmedSubscribers: function (listId, filter, callback) {
        new List(this.createsend, listId).getUnconfirmedSubscribers(filter, callback);
    },

    getUnsubscribedSubscribers: function (listId, filter, callback) {
        new List(this.createsend, listId).getUnsubscribedSubscribers(filter, callback);
    },

    getWebhooks: function (listId, callback) {
        new List(this.createsend, listId).getWebhooks(callback);
    },

    testWebhook: function (listId, webhookId, callback) {
        new List(this.createsend, listId).testWebhook(webhookId, callback);
    },

    updateList: function (listId, details, callback) {
        new List(this.createsend, listId).update(details, callback);
    },

    updateCustomField: function (listId, key, details, callback) {
        new List(this.createsend, listId).updateCustomField(key, details, callback);
    },

    updateCustomFieldOptions: function (listId, key, details, callback) {
        new List(this.createsend, listId).updateCustomFieldOptions(key, details, callback);
    }
};