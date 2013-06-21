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

//---------------------------------------------------------------------------
// Account requests
//---------------------------------------------------------------------------
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

//---------------------------------------------------------------------------
// Client requests
//---------------------------------------------------------------------------
app.post('/api/v3/clients.json', function (req, res) {
    sendFixture(res, 'create_client');
});

app.get('/api/v3/clients/32a381c49a2df99f1d0c6f3c112352b9.json', function (req, res) {
    sendFixture(res, 'client_details');
});

app.delete('/api/v3/clients/32a381c49a2df99f1d0c6f3c112352b9.json', function (req, res) {
    res.send("");
});

//---------------------------------------------------------------------------
// List requests
//---------------------------------------------------------------------------
app.post('/api/v3/lists/32a381c49a2df99f1d0c6f3c112352b9.json', function (req, res) {
    sendFixture(res, 'create_list');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    sendFixture(res, 'list_details');
});

//---------------------------------------------------------------------------
// Subscriber requests
//---------------------------------------------------------------------------
app.post('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    sendFixture(res, 'add_subscriber');
});

app.put('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    res.send("");
})

app.get('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    sendFixture(res, 'subscriber_details');
});

app.delete('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    res.send("");
});

app.get('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee/history.json', function (req, res) {
    sendFixture(res, 'subscriber_history');
});

app.post('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee/unsubscribe.json', function (req, res) {
    res.send("");
});

app.post('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee/import.json', function (req, res) {
    sendFixture(res, 'import_subscribers')
});

app.listen(3000);

require('../integration/account.js');
require('../integration/subscribers.js');
require('../integration/lists.js');