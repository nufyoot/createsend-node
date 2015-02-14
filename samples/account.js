var createsend = require('createsend-node');
var apiDetails = { apiKey: 'your api key goes here' };
var api = new createsend(apiDetails);

// First, a demonstration on getting the list of clients for an account.
api.account.getClients(function (err, clientList) {
    for (var i = 0; i < clientList.length; i++) {
        console.log(clientList[i]);
    }
});
