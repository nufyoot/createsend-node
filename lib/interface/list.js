module.exports = List;

function List(createsend, listId) {
    this.createsend = createsend;
    this.listId = listId;
}

List.prototype = {
    activateWebhook: function (webhookId, callback) {
        this.createsend.put('lists/' + this.listId + '/webhooks/' + webhookId + '/activate.json', null, null, callback);
    },

    createCustomField: function (details, callback) {
        this.createsend.post('lists/' + this.listId + '/customfields.json', null, details, callback);
    },

    createWebhook: function (details, callback) {
        this.createsend.post('lists/' + this.listId + '/webhooks.json', null, details, callback);
    },

    deactivateWebhook: function (webhookId, callback) {
        this.createsend.delete('lists/' + this.listId + '/webhooks/' + webhookId + '.json', null, null, callback);
    },

    delete: function (callback) {
        this.createsend.delete('lists/' + this.listId + '.json', null, null, callback);
    },

    deleteCustomField: function (key, callback) {
        this.createsend.delete('lists/' + this.listId + '/customfields/' + key + '.json', null, null, callback);
    },

    deleteWebhook: function (webhookId, callback) {
        this.createsend.delete('lists/' + this.listId + '/webhooks/' + webhookId + '.json', null, null, callback);
    },

    getActiveSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/active.json', filter, null, callback);
    },

    getBouncedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/bounced.json', filter, null, callback);
    },

    getCustomFields: function (callback) {
        this.createsend.get('lists/' + this.listId + '/customfields.json', null, null, callback);
    },

    getDeletedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/deleted.json', filter, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('lists/' + this.listId + '.json', null, null, callback);
    },

    getSegments: function (callback) {
        this.createsend.get('lists/' + this.listId + '/segments.json', null, null, callback);
    },

    getStats: function (callback) {
        this.createsend.get('lists/' + this.listId + '/stats.json', null, null, callback);
    },

    getUnconfirmedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/unconfirmed.json', filter, null, callback);
    },

    getUnsubscribedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/unsubscribed.json', filter, null, callback);
    },

    getWebhooks: function (callback) {
        this.createsend.get('lists/' + this.listId + '/webhooks.json', null, null, callback);
    },

    testWebhook: function (webhookId, callback) {
        this.createsend.get('lists/' + this.listId + '/webhooks/' + webhookId + '/test.json', null, null, callback);
    },

    update: function (details, callback) {
        this.createsend.put('lists/' + this.listId + '.json', null, details, callback);
    },

    updateCustomField: function (key, details, callback) {
        this.createsend.put('lists/' + this.listId + '/customfields/' + key + '.json', null, details, callback);
    },

    updateCustomFieldOptions: function (key, details, callback) {
        this.createsend.put('lists/' + this.listId + '/customfields/' + key + '/options.json', null, details, callback);
    }
};
