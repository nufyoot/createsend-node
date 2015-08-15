var Person = require('./person.js');

module.exports = Client;

function Client(createsend, clientId, name) {
  this.createsend = createsend;
  this.clientId = clientId;
  if (name) { this.name = name; }
}

Client.prototype = {
    addPerson: function (details, callback) {
        var createsend = this.createsend;
        var clientId = this.clientId;
        createsend.post('clients/' + this.clientId + '/people.json', null, details,
            function (err, result) {
                if (err) { return callback(err); }
                callback(null, new Person(createsend, clientId, result.EmailAddress));
            });
    },

    createList: function (details, callback) {
        this.createsend.lists.createList(this.clientId, details, callback);
    },

    delete: function (callback) {
        this.createsend.delete('clients/' + this.clientId + '.json', null, null, callback);
    },

    deletePerson: function (emailAddress, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.delete(callback);
    },

    getDetails: function (callback) {
        this.createsend.get('clients/' + this.clientId + '.json', null, null, callback);
    },

    getDraftCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/drafts.json', null, null, callback);
    },

    getLists: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/lists.json', null, null, callback);
    },

    getPeople: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/people.json', null, null, callback);
    },

    getPersonDetails: function (emailAddress, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.getDetails(callback);
    },

    getPrimaryContact: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/primarycontact.json', null, null, callback);
    },

    getListsForEmail: function (emailAddress, callback) {
        this.createsend.get('clients/' + this.clientId + '/listsforemail.json', { 'email': emailAddress }, null, callback);
    },

    getScheduledCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/scheduled.json', null, null, callback);
    },

    getSegments: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/segments.json', null, null, callback);
    },

    getSentCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/campaigns.json', null, null, callback);
    },

    getSuppressionList: function (filter, callback) {
        this.createsend.get('clients/' + this.clientId + '/suppressionlist.json', filter, null, callback);
    },

    getTemplates: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/templates.json', null, null, callback);
    },

    setDetails: function (details, callback) {
        this.createsend.put('clients/' + this.clientId + '/setbasics.json', null, details, callback);
    },

    setMonthlyBilling: function (billingDetails, callback) {
        this.createsend.put('clients/' + this.clientId + '/setmonthlybilling.json', null, billingDetails, callback);
    },

    setPaygBilling: function (billingDetails, callback) {
        this.createsend.put('clients/' + this.clientId + '/setpaygbilling.json', null, billingDetails, callback);
    },

    setPrimaryContact: function (emailAddress, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.setAsPrimaryContact(callback);
    },

    suppress: function (emailAddress, callback) {
        this.createsend.post('clients/' + this.clientId + '/suppress.json', null, { 'EmailAddress': emailAddress }, callback);
    },

    transferCredits: function (details, callback) {
        this.createsend.post('clients/' + this.clientId + '/credits.json', null, details, callback);
    },

    updatePerson: function (emailAddress, details, callback) {
        var person = new Person(this.createsend, this.clientId, emailAddress);
        person.update(details, callback);
    },

    unsuppress: function (emailAddress, callback) {
        this.createsend.put('clients/' + this.clientId + '/unsuppress.json', { 'email': emailAddress }, null, callback);
    }
}
