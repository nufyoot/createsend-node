var utils   = require('./utils.js');

module.exports = Lists;

function Lists(createsend) {
    this.createsend = createsend;
}

Lists.prototype = {
    getSegments: function (listId, callback) {
        this.createsend.get('lists/' + listId + '/segments', null, null, callback);
    }
};