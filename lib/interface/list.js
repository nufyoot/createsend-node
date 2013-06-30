module.exports = List;

function List(createsend, listId) {
    this.createsend = createsend;
    this.listId = listId;
}

List.prototype = {
    activateWebhook: function (webhookId, callback) {
        this.createsend.put('lists/' + this.listId + '/webhooks/' + webhookId + '/activate', null, null, callback);
    },

    createCustomField: function (details, callback) {
        this.createsend.post('lists/' + this.listId + '/customfields', null, details, callback);
    },

    createWebhook: function (details, callback) {
        this.createsend.post('lists/' + this.listId + '/webhooks', null, details, callback);
    },

    deactivateWebhook: function (webhookId, callback) {
        this.createsend.delete('lists/' + this.listId + '/webhooks/' + webhookId, null, null, callback);
    },

    delete: function (callback) {
        this.createsend.delete('lists/' + this.listId, null, null, callback);
    },

    deleteCustomField: function (key, callback) {
        this.createsend.delete('lists/' + this.listId + '/customfields/' + key, null, null, callback);
    },

    deleteWebhook: function (webhookId, callback) {
        this.createsend.delete('lists/' + this.listId + '/webhooks/' + webhookId, null, null, callback);
    },

    getActiveSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/active', filter, null, callback);
    },

    getBouncedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/bounced', filter, null, callback);
    },

    getCustomFields: function (callback) {
        this.createsend.get('lists/' + this.listId + '/customfields', null, null, callback);
    },

    getDeletedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/deleted', filter, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('lists/' + this.listId, null, null, callback);
    },

    getSegments: function (callback) {
        this.createsend.get('lists/' + this.listId + '/segments', null, null, callback);
    },

    getStats: function (callback) {
        this.createsend.get('lists/' + this.listId + '/stats', null, null, callback);
    },

    getUnconfirmedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/unconfirmed', filter, null, callback);
    },

    getUnsubscribedSubscribers: function (filter, callback) {
        this.createsend.get('lists/' + this.listId + '/unsubscribed', filter, null, callback);
    },

    getWebhooks: function (callback) {
        this.createsend.get('lists/' + this.listId + '/webhooks', null, null, callback);
    },

    testWebhook: function (webhookId, callback) {
        this.createsend.get('lists/' + this.listId + '/webhooks/' + webhookId + '/test', null, null, callback);
    },

    update: function (details, callback) {
        this.createsend.put('lists/' + this.listId, null, details, callback);
    },

    updateCustomField: function (key, details, callback) {
        this.createsend.put('lists/' + this.listId + '/customfields/' + key, null, details, callback);
    },

    updateCustomFieldOptions: function (key, details, callback) {
        this.createsend.put('lists/' + this.listId + '/customfields/' + key + '/options', null, details, callback);
    }
};