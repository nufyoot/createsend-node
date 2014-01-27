var Person = require('./person.js');

module.exports = Client;

function Client(createsend, clientId, name) {
  this.createsend = createsend;
  this.clientId = clientId;
  if (name) { this.name = name; }
}

Client.prototype = {
    addPerson: function (details, callback) {
        this.createsend.post('clients/' + this.clientId + '/people', null, details, callback);
    },

    createList: function (details, callback) {
        this.createsend.lists.createList(this.clientId, details, callback);
    },

    delete: function (callback) {
        this.createsend.delete('clients/' + this.clientId, null, null, callback);
    },

    deletePerson: function (emailAddress, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.delete(callback);
    },

    getDetails: function (callback) {
        this.createsend.get('clients/' + this.clientId, null, null, callback);
    },

    getDraftCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/drafts', null, null, callback);
    },

    getLists: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/lists', null, null, callback);
    },

    getPeople: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/people', null, null, callback);
    },

    getPersonDetails: function (emailAddress, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.getDetails(callback);
    },

    getPrimaryContact: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/primarycontact', null, null, callback);
    },

    getListsForEmail: function (emailAddress, callback) {
        this.createsend.get('clients/' + this.clientId + '/listsforemail', new { 'email': emailAddress }, null, callback);
    },

    getScheduledCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/scheduled', null, null, callback);
    },

    getSegments: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/segments', null, null, callback);
    },

    getSentCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/campaigns', null, null, callback);
    },

    getSuppressionList: function (filter, callback) {
        this.createsend.get('clients/' + this.clientId + '/suppressionlist', filter, null, callback);
    },

    getTemplates: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/templates', null, null, callback);
    },

    setDetails: function (details, callback) {
        this.createsend.put('clients/' + this.clientId + '/setbasics', null, details, callback);
    },

    setMonthlyBilling: function (billingDetails, callback) {
        this.createsend.put('clients/' + this.clientId + '/setmonthlybilling', null, billingDetails, callback);
    },

    setPaygBilling: function (billingDetails, callback) {
        this.createsend.put('clients/' + this.clientId + '/setpaygbilling', null, billingDetails, callback);
    },

    setPrimaryContact: function (emailAddress, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.setAsPrimaryContact(callback);
    },

    suppress: function (emailAddress, callback) {
        this.createsend.post('clients/' + this.clientId + '/suppress', null, new { 'EmailAddress': emailAddress }, callback);
    },

    transferCredits: function (details, callback) {
        this.createsend.post('clients/' + this.clientId + '/credits', null, details, callback);
    },

    updatePerson: function (emailAddress, details, callback) {
        var person = new Person(this.createsend, this.clientId, emailaddress);
        person.update(details, callback);
    },

    unsuppress: function (emailAddress, callback) {
        this.createsend.put('clients/' + this.clientId + '/unsuppress', new { 'email': emailAddress }, null, callback);
    }
}