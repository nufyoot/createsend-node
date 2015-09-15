var fs         = require('fs');
var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser').json();

var app = express();

app.use(bodyParser);

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
    res.send('');
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

app.post('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/customfields.json', function (req, res) {
    sendFixture(res, 'create_custom_field');
});

app.put('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/customfields/:key/options.json', function (req, res) {
    res.send('');
});

app.put('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/customfields/:key.json', function (req, res) {
    sendFixture(res, 'update_custom_field');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/customfields.json', function (req, res) {
    sendFixture(res, 'custom_fields');
});

app.delete('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    res.send('');
});

app.delete('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/customfields/:key.json', function (req, res) {
    res.send('');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/stats.json', function (req, res) {
    sendFixture(res, 'list_stats')
});

app.put('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    res.send('');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/active.json', function (req, res) {
    sendFixture(res, 'active_subscribers');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/bounced.json', function (req, res) {
    sendFixture(res, 'bounced_subscribers');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/unconfirmed.json', function (req, res) {
    sendFixture(res, 'unconfirmed_subscribers');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/unsubscribed.json', function (req, res) {
    sendFixture(res, 'unsubscribed_subscribers');
});

app.get('/api/v3/lists/e3c5f034d68744f7881fdccf13c2daee/deleted.json', function (req, res) {
    sendFixture(res, 'deleted_subscribers');
});

//---------------------------------------------------------------------------
// Subscriber requests
//---------------------------------------------------------------------------
app.post('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    sendFixture(res, 'add_subscriber');
});

app.put('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    res.send('');
})

app.get('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    sendFixture(res, 'subscriber_details');
});

app.delete('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee.json', function (req, res) {
    res.send('');
});

app.get('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee/history.json', function (req, res) {
    sendFixture(res, 'subscriber_history');
});

app.post('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee/unsubscribe.json', function (req, res) {
    res.send('');
});

app.post('/api/v3/subscribers/e3c5f034d68744f7881fdccf13c2daee/import.json', function (req, res) {
    sendFixture(res, 'import_subscribers')
});

//---------------------------------------------------------------------------
// Campaign requests
//---------------------------------------------------------------------------
app.post('/api/v3/campaigns/32a381c49a2df99f1d0c6f3c112352b9.json', function (req, res) {
    sendFixture(res, 'create_campaign');
});

//---------------------------------------------------------------------------
// Transactional requests
//---------------------------------------------------------------------------
app.get('/api/v3.1/transactional/smartemail', function (req, res) {
    sendFixture(res, 'smart_email_list');
});

app.get('/api/v3.1/transactional/smartemail/53e872f5-d8d7-46c9-b3d2-e7c7fc650708', function (req, res) {
    sendFixture(res, 'smart_email_details');
});

app.post('/api/v3.1/transactional/smartemail/53e872f5-d8d7-46c9-b3d2-e7c7fc650708/send', function (req, res) {
    sendFixture(res, 'send_smart_email');
});

app.post('/api/v3.1/transactional/classicEmail/send', function (req, res) {
    sendFixture(res, 'send_classic_email');
});

app.get('/api/v3.1/transactional/classicEmail/groups', function (req, res) {
    sendFixture(res, 'classic_email_group_list');
});

app.get('/api/v3.1/transactional/statistics', function (req, res) {
    sendFixture(res, 'statistics');
});

app.get('/api/v3.1/transactional/messages', function (req, res) {
    sendFixture(res, 'message_timeline');
});

app.get('/api/v3.1/transactional/messages/0f35d46f-47c5-11e5-a012-1086f014547c', function (req, res) {
    sendFixture(res, 'message_details');
});

app.post('/api/v3.1/transactional/messages/1f4f02b2-577a-11e5-8e36-ed63f5913d87/resend', function (req, res) {
    sendFixture(res, 'message_resend');
});


app.listen(3000);

require('../integration/account.js');
require('../integration/subscribers.js');
require('../integration/lists.js');
require('../integration/campaigns.js');
require('../integration/transactional.js');