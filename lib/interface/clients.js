var utils   = require('./utils.js');
var Client  = require('./client.js');

module.exports = Clients;

function Clients(createsend) {
    this.createsend = createsend;
}

Clients.prototype = {
    addClient: function (details, callback) {
        var createsend = this.createsend;
        createsend.post('clients', null, details, function (err, clientId) {
            if (err) {
                callback(err);
                return;
            }

            callback(err, new Client(createsend, clientId));
        });
    }
};