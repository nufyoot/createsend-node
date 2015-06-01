module.exports = Administrator;

function Administrator(createsend, emailAddress) {
    this.createsend = createsend;
    this.emailAddress = emailAddress;
}

Administrator.prototype = {
    delete: function (callback) {
        this.createsend.delete('admins.json', { 'email': this.emailAddress }, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('admins.json', { 'email': this.emailAddress }, null, callback);
    },

    update: function (emailAddress, name, callback) {
        var self = this;
        this.createsend.put('admins.json', { 'email': this.emailAddress }, { 'EmailAddress': emailAddress, 'Name': name }, function (err, result) {
            if (err) {
                callback(err);
                return;
            }

            self.emailAddress = emailAddress;
            callback(null, self);
        });
    }
}