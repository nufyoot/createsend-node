var utils = require('./utils.js');

module.exports = Account;

function Account(createsend, email) {
  this.createsend = createsend;
  this.email = email;
}

Account.add = function (createsend, email, name, callback) {
  createsend.post('admins', null, { 'Email': email, 'Name': name }, function (err, result) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, new Account(createsend, result.EmailAddress));
  });
}

Account.prototype.update = function (email, name, callback) {
  this.createsend.post('admins', { 'email': this.email }, { 'EmailAddress': email, 'Name': name }, function (err, result) {
    if (err) {
      callback(err);
      return;
    }

    this.email = email;
    callback(null, this);
  });
}