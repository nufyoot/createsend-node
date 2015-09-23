module.exports = TransactionalSmartEmail;

function TransactionalSmartEmail(createsend, smartEmailId) {
    this.createsend = createsend;
    this.smartEmailId = smartEmailId;
}

TransactionalSmartEmail.prototype = {
    send: function (details, callback) {
        this.createsend.post('transactional/smartemail/' + this.smartEmailId + '/send'  , null, details, callback);
    },
};