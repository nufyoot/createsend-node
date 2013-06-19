var fs      = require('fs');
var express = require('express');
var path    = require('path');

var app = express();

function sendFixture(res, filename) {
    fs.readFile(path.join(__dirname, './fixtures/' + filename + '.json'), function (err, data) {
        if (err) throw err;
        res.send(data);
    });
}


app.get('/api/v3/clients.json', function (req, res) {
    sendFixture(res, 'clients');
});

app.get('/api/v3/billingdetails.json', function (req, res) {
    sendFixture(res, 'billingdetails');
});

app.get('/api/v3/apikey.json', function (req, res) {
    sendFixture(res, 'apikey');
});

app.get('/api/v3/countries.json', function (req, res) {
    sendFixture(res, 'countries');
});

app.get('/api/v3/timezones.json', function (req, res) {
    sendFixture(res, 'timezones');
});

app.get('/api/v3/systemdate.json', function (req, res) {
    sendFixture(res, 'systemdate');
});

app.listen(3000);

require('../integration/account.js');