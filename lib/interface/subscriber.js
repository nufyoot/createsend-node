module.exports = Subscriber;

function Subscriber(createsend, listId, emailAddress) {
    this.createsend = createsend;
    this.listId = listId;
    this.emailAddress = emailAddress;
}

Subscriber.prototype = {
    delete: function (callback) {
        this.createsend.delete('subscribers/' + this.listId + '.json', { 'email': this.emailAddress }, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('subscribers/' + this.listId + '.json', { 'email': this.emailAddress }, null, callback);
    },

    getHistory: function (callback) {
        this.createsend.get('subscribers/' + this.listId + '/history.json', { 'email': this.emailAddress }, null, callback);
    },

    unsubscribe: function (callback) {
        this.createsend.post('subscribers/' + this.listId + '/unsubscribe.json', null, { 'EmailAddress': this.emailAddress }, callback);
    },

    update: function (details, callback) {
        this.createsend.put('subscribers/' + this.listId + '.json', { 'email': this.emailAddress }, details, callback);
    }
};