var utils   = require('./utils.js');
var Client  = require('./client.js');

module.exports = Clients;

function Clients(createsend) {
    this.createsend = createsend;
}

Clients.prototype = {
    addClient: function (details, callback) {
        var createsend = this.createsend;
        createsend.post('clients.json', null, details, function (err, clientId) {
            if (err) { return callback(err); }
            callback(err, new Client(createsend, clientId));
        });
    },

    addPerson: function (clientId, details, callback) {
        new Client(this.createsend, clientId).addPerson(details, callback);
    },

    deleteClient: function (clientId, callback) {
        new Client(this.createsend, clientId).delete(callback);
    },

    deletePerson: function (clientId, emailAddress, callback) {
        new Client(this.createsend, clientId).deletePerson(emailAddress, callback);
    },

    getClientDetails: function (clientId, callback) {
        new Client(this.createsend, clientId).getDetails(callback);
    },
    
    getDraftCampaigns: function (clientId, callback) {
        new Client(this.createsend, clientId).getDraftCampaigns(callback);
    },

    getLists: function (clientId, callback) {
        new Client(this.createsend, clientId).getLists(callback);
    },

    getPeople: function (clientId, callback) {
        new Client(this.createsend, clientId).getPeople(callback);
    },

    getPersonDetails: function (clientId, emailAddress, callback) {
        new Client(this.createsend, clientId).getPersonDetails(emailAddress, callback);
    },

    getPrimaryContact: function (clientId, callback) {
        new Client(this.createsend, clientId).getPrimaryContact(callback);
    },

    getListsForEmail: function (clientId, emailAddress, callback) {
        new Client(this.createsend, clientId).getListsForEmail(emailAddress, callback);
    },

    getScheduledCampaigns: function (clientId, callback) {
        new Client(this.createsend, clientId).getScheduledCampaigns(callback);
    },

    getSegments: function (clientId, callback) {
        new Client(this.createsend, clientId).getSegments(callback);
    },

    getSentCampaigns: function (clientId, callback) {
        new Client(this.createsend, clientId).getSentCampaigns(callback);
    },

    getSuppressionList: function (clientId, filter, callback) {
        new Client(this.createsend, clientId).getSuppressionList(filter, callback);
    },

    getTemplates: function (clientId, callback) {
        new Client(this.createsend, clientId).getTemplates(callback);
    },

    setClientDetails: function (clientId, details, callback) {
        new Client(this.createsend, clientId).setClientDetails(callback);
    },

    setMonthlyBilling: function (clientId, billingDetails, callback) {
        new Client(this.createsend, clientId).setMonthlyBilling(billingDetails, callback);
    },

    setPaygBilling: function (clientId, billingDetails, callback) {
        new Client(this.createsend, clientId).setPaygBilling(billingDetails, callback);
    },

    setPrimaryContact: function (clientId, emailAddress, callback) {
        new Client(this.createsend, clientId).setPrimaryContact(emailAddress, callback);
    },

    suppress: function (clientId, emailAddress, callback) {
        new Client(this.createsend, clientId).suppress(emailAddress, callback);
    },

    transferCredits: function (clientId, details, callback) {
        new Client(this.createsend, clientId).transferCredits(details, callback);
    },

    updatePerson: function (clientId, emailAddress, details, callback) {
        new Client(this.createsend, clientId).updatePerson(emailAddress, details, callback);
    },

    unsuppress: function (clientId, emailAddress, callback) {
        new Client(this.createsend, clientId).unsuppress(emailAddress, callback);
    }
};