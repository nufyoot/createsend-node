var utils   = require('./utils.js');
var List    = require('./list.js');

module.exports = Lists;

function Lists(createsend, clientId) {
    this.createsend = createsend;
    this.clientId = clientId;
}

Lists.prototype = {
    createList: function (details, callback) {
        var createsend = this.createsend;
        createsend.post('lists/' + this.clientId, null, details, function (err, listId) {
            if (err) { return callback(err); }
            callback(null, new List(createsend, listId));
        });
    }
};