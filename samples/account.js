var createsend = require('../');
var fs = require('fs');

var apiDetails = JSON.parse(fs.readFileSync('./credentials.json'));
var api = new createsend(apiDetails);

console.log(apiDetails);

api.account.getClients(function (err, clientList) {
    if (err) throw err;
});

api.account.getBillingDetails(function (err, details) {
    if (err) throw err;
});

api.getApiKey(apiDetails.siteurl, apiDetails.username, apiDetails.password, function (err, apiKey) {
    if (err) throw err;
});

api.getCountries(function (err, countries) {
    if (err) throw err;
});

api.getTimezones(function (err, timezones) {
    if (err) throw err;
});

api.getSystemDate(function (err, date) {
    if (err) throw err;
});

api.account.addAdministrator('test@createsend.com', 'Test', function (err, admin) {
    if (err) throw err;

    admin.update('test23@createsend.com', 'Name Change', function (err, admin) {
        if (err) throw err;
        
        admin.getDetails(function (err, details) {
            if (err) throw err;

            if (details.EmailAddress != 'test23@createsend.com') throw new Error('Email didn\'t change');
            if (details.Name != 'Name Change') throw new Error('Name didn\'t change');

            admin.delete(function (err) {
                if (err) throw err;
            })
        })
    })
});