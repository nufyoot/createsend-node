var utils = require('./utils.js');

module.exports = Account;

function Administrator(createsend, emailAddress) {
  this.createsend = createsend;
  this.emailAddress = emailAddress;
}

Administrator.prototype.update = function (emailAddress, name, callback) {
  this.createsend.put('admins', { 'email': this.emailAddress }, { 'EmailAddress': emailAddress, 'Name': name }, function (err, result) {
    if (err) {
      callback(err);
      return;
    }

    this.emailAddress = emailAddress;
    callback(null, this);
  });
}

function Account(createsend) {
  this.createsend = createsend;
}

Account.prototype.add = function (emailAddress, name, callback) {
  var createsend = this.createsend;
  createsend.post('admins', null, { 'Email': emailAddress, 'Name': name }, function (err, result) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, new Administrator(createsend, emailAddress, name));
  });
}

Account.prototype.getAdministrators = function (callback) {
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
}