var utils         = require('./utils.js');
var Administrator = require('./administrator.js');
var Client        = require('./client.js');

module.exports = Account;

function Account(createsend) {
    this.createsend = createsend;
}

Account.prototype = {
    addAdministrator: function (emailAddress, name, callback) {
        var createsend = this.createsend;
        createsend.post('admins', null, { 'EmailAddress': emailAddress, 'Name': name }, function (err, result) {
            if (err) { return callback(err); }
            callback(null, new Administrator(createsend, emailAddress, name));
        });
    },

    deleteAdministrator: function (emailAddress, callback) {
        new Administrator(this.createsend, emailAddress).delete(callback);
    },

    externalSession: function (request, callback) {
        this.createsend.put('externalsession.json', null, request, callback);
    },

    getAdministrators: function (callback) {
        var createsend = this.createsend;
        createsend.get('admins', null, null, function (err, admins) {
            if (err) { return callback(err); }

            for (var i = 0; i < admins.length; i++) {
                var admin = admins[i]
                admins[i] = new Administrator(createsend, admin.EmailAddress, admin.Name, admin.Status);
            }
            callback(null, admins);
        });
    },

    getAdministratorDetails: function (emailAddress, callback) {
        var administrator = new Administrator(this.createsend, emailAddress);
        administrator.getDetails(callback);
    },

    getBillingDetails: function (callback) {
        this.createsend.get('billingdetails.json', null, null, function (err, result) {
            if (err) { return callback(err); }

            callback(null, { credits: result.Credits });
        });
    },

    getClients: function (callback) {
        var createsend = this.createsend;
        createsend.get('clients.json', null, null, function (err, results) {
            if (err) { return callback(err); }

            var clients = [];
            for (var i = 0; i < results.length; i++) {
                clients.push(new Client(createsend, results[i].ClientID, results[i].Name));
            }
            callback(null, clients);
        });
    },

    getPrimaryContact: function (callback) {
        this.createsend.get('primarycontact.json', null, null, callback);
    },

    setPrimaryContact: function (emailAddress, callback) {
        this.createsend.put('primarycontact.json', { 'email': emailAddress }, null, callback);
    },

    updateAdministrator: function (emailAddress, newEmailAddress, newName, callback) {
        var administrator = new Administrator(this.createsend, emailAddress);
        administrator.update(newEmailAddress, newName, callback);
    }
}
