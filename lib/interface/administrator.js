module.exports = Administrator;

function Administrator(createsend, emailAddress) {
  this.createsend = createsend;
  this.emailAddress = emailAddress;
}

Administrator.prototype = {
  delete: function (callback) {
    this.createsend.delete('admins', { 'email': this.emailAddress }, null, callback);
  },

  getDetails: function (callback) {
    this.createsend.get('admins', { 'email': this.emailAddress }, null, callback);
  },

  update: function (emailAddress, name, callback) {
    this.createsend.put('admins', { 'email': this.emailAddress }, { 'EmailAddress': emailAddress, 'Name': name }, function (err, result) {
      if (err) {
        callback(err);
        return;
      }

      this.emailAddress = emailAddress;
      callback(null, this);
    });
  }
}