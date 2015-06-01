var Subscriber = require('./subscriber.js');

module.exports = Subscribers;

function Subscribers(createsend) {
    this.createsend = createsend;
}

Subscribers.prototype = {
    addSubscriber: function (listId, details, callback) {
        var createsend = this.createsend;
        createsend.post('subscribers/' + listId + '.json', null, details, function (err, emailAddress) {
            if (err) { return callback(err); }
            callback(null, new Subscriber(createsend, listId, emailAddress));
        });
    },

    deleteSubscriber: function (listId, emailAddress, callback) {
        new Subscriber(this.createsend, listId, emailAddress).delete(callback);
    },

    getSubscriberDetails: function (listId, emailAddress, callback) {
        new Subscriber(this.createsend, listId, emailAddress).getDetails(callback);
    },

    getSubscriberHistory: function (listId, emailAddress, callback) {
        new Subscriber(this.createsend, listId, emailAddress).getHistory(callback);
    },

    import: function (listId, subscribers, callback) {
        this.createsend.post('subscribers/' + listId + '/import.json', null, subscribers, callback);
    },

    unsubscribeSubscriber: function(listId, emailAddress, callback) {
        new Subscriber(this.createsend, listId, emailAddress).unsubscribe(callback);
    },

    updateSubscriber: function (listId, emailAddress, details, callback) {
        new Subscriber(this.createsend, listId, emailAddress).update(details, callback);
    }
};