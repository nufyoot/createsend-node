var utils = require('./utils.js');
var Administrator = require('./administrator.js');

module.exports = Account;

function Account(createsend) {
  this.createsend = createsend;
}

Account.prototype = {
  addAdministrator: function (emailAddress, name, callback) {
    var createsend = this.createsend;
    createsend.post('admins', null, { 'EmailAddress': emailAddress, 'Name': name }, function (err, result) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, new Administrator(createsend, emailAddress, name));
    });
  },

  deleteAdministrator: function (emailAddress, callback) {
    var administrator = new Administrator(this.createsend, emailAddress);
    administrator.delete(callback);
  },

  externalSession: function (request, callback) {
    this.createsend.put('externalsession', null, request, callback);
  },

  getAdministrators: function (callback) {
    var createsend = this.createsend;
    createsend.get('admins', null, null, function (err, admins) {
      if (err) {
        callback(err);
        return;
      }

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
    this.createsend.get('billingdetails', null, null, callback);
  },

  getClients: function (callback) {
    this.createsend.get('clients', null, null, callback);
  },

  getPrimaryContact: function (callback) {
    this.createsend.get('primarycontact', null, null, callback);
  },

  setPrimaryContact: function (emailAddress, callback) {
    this.createsend.put('primarycontact', { 'email': emailAddress }, null, callback);
  },

  updateAdministrator: function (emailAddress, newEmailAddress, newName, callback) {
    var administrator = new Administrator(this.createsend, emailAddress);
    administrator.update(newEmailAddress, newName, callback);
  }
}

