module.exports = Client;

function Client(createsend, clientId, name) {
  this.createsend = createsend;
  this.clientId = clientId;
  if (name) { this.name = name; }
}

Client.prototype = {
    getDetails: function (callback) {
        this.createsend.get('clients/' + this.clientId, null, null, callback);
    },

    getDraftCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/drafts', null, null, callback);
    },

    getLists: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/lists', null, null, callback);
    },

    getListsForEmail: function (emailAddress, callback) {
        this.createsend.get('clients/' + this.clientId + '/listsforemail', new { 'email': emailAddress }, null, callback);
    },

    getScheduledCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/scheduled', null, null, callback);
    },

    getSentCampaigns: function (callback) {
        this.createsend.get('clients/' + this.clientId + '/campaigns', null, null, callback);
    }
}