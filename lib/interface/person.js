module.exports = Person;

function Person(createsend, clientId, emailAddress) {
    this.createsend = createsend;
    this.clientId = clientId;
    this.emailAddress = emailAddress;
}

Person.prototype = {
    delete: function (callback) {
        this.createsend.delete('clients/' + this.clientId + '/people.json', { 'email': this.emailAddress }, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/people.json', { 'email': this.emailAddress }, null, callback);
    },

    setAsPrimaryContact: function (callback) {
        this.createsend.put('clients/' + this.clientId + '/primarycontact.json', { 'email': this.emailAddress }, null, callback);
    },

    update: function (details, callback) {
        this.createsend.put('clients/' + this.clientId + '/people.json', { 'email': this.emailAddress }, details, callback);
    }
};
