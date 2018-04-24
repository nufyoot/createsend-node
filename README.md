# CreateSend API Wrapper

[![Build Status](https://travis-ci.org/nufyoot/createsend-node.png?branch=master)](https://travis-ci.org/nufyoot/createsend-node) [![Dependency Status](https://gemnasium.com/nufyoot/createsend-node.png)](https://gemnasium.com/nufyoot/createsend-node) [![Coverage Status](https://coveralls.io/repos/nufyoot/createsend-node/badge.svg)](https://coveralls.io/r/nufyoot/createsend-node)

## Installation

```
npm install createsend-node
```

## Authenticating

via API Key

```javascript
var createsend = require('createsend-node');
var auth = { apiKey: 'your api key' };
var api = new createsend(auth);
```

via AccessToken (Oauth)

```javascript
var createsend = require('createsend-node');
var auth = { accessToken: 'your access token' };
var api = new createsend(auth);
```

## Basic classes

I've wrapped just about every request in some type of class to make life a lot easier when dealing with request from the Campaign Monitor API. Here are the classes that exist in createsend-node.

### Client

```javascript
{
    clientId: "This will be the Id from Campaign Monitor",
    name: "The name of the client",

    addPerson: function (details, callback) {
        /*
        "details" is simply the data that Campaign Monitor is looking for according to
        http://www.campaignmonitor.com/api/clients/#adding_a_person

        details: {
            "EmailAddress": "sally@sparrow.com",
            "Name": "Sally Sparrow",
            "AccessLevel": 23,
            "Password": "opensesame"
        }

        callback: function (err, person) {
            "person" is a single Person object
        }
        */
    },
    createList: function (details, callback) { },
    delete: function (callback) { },
    deletePerson: function (callback) { },
    getDetails: function (callback) { },
    getDraftCampaigns: function (callback) { },
    getLists: function (callback) { },
    getPeople: function (callback) { },
    getPersonDetails: function (emailAddress, callback) { },
    getPrimaryContact: function (callback) { },
    getListsForEmail: function (emailAddress, callback) { },
    getScheduledCampaigns: function (callback) { },
    getSegments: function (callback) { },
    getSentCampaigns: function (callback) { },
    getSuppressionList: function (filter, callback) { },
    getTemplates: function (callback) { },
    setDetails: function (details, callback) { },
    setMonthlyBilling: function (billingDetails, callback) { },
    setPaygBilling: function (billingDetails, callback) { },
    setPrimaryContact: function (emailAddress, callback) { },
    suppress: function (emailAddress, callback) { },
    transferCredits: function (details, callback) { },
    updatePerson: function (emailAddress, details, callback) { },
    unsuppress: function (emailAddress, callback) { }
}
```

## Account based actions

Get the list of clients.

```javascript
api.account.getClients(
  function (err, clientList) {

  }
);
```

## Transaction based actions

Send a transactional email

```javascript
var details = {
  smartEmailID: "string", // The ID of the transactional email
  To: "string",           // The email address to send it to
  Data: data              // Any data fields required for the email
};

// Send the smart email(and provide a callback function that takes an error and a response parameter)
api.transactional.sendSmartEmail(details, (err, res) => {
  if (err)  console.log(err);
});
```

## Subscribers based actions

Add a subscriber to a list

```javascript
var listId = 'kajsbndkasjbkanf123j13nj21k3n2' // The ID of the list
var details = {
  EmailAddress: 'email@example.com',
  Name: `John Smith`,
  CustomFields: [
    { Key: 'CustomKey', Value: 'Some Value' }
  ]
};

api.subscribers.addSubscriber(listId, details, (err, res) => {
  if (err) console.log(err);
});
```

> Side Note: To get the ID of the list, in CM, go to `Lists & Subscribers`, choose the list you want and click on `change name/type`.

## Campaigns Actions

Create a campaign draft from a template

```javascript
var clientId = "xxxxx";

var details = {
    "Name": "campaign_name",    // name of the campaign
    "Subject": "subject",       // subject of the campaign
    "FromName": "string",       // "from" name
    "FromEmail": "string",      // "from" email address
    "ReplyTo": "string",        // "reply to" email address
    "ListIDs": ["string","string"], // array of lists to send the campaign to
    "TemplateID": "string",     // id of the template
    "TemplateContent": {        // only an example, follow the instructions at https://www.campaignmonitor.com/api/campaigns/#creating-campaign-template to match your template
        "Multilines": [{
            "Content": "string"
        }],
        "Singlelines": [{
            "Content": "string"
        }]
    }
}

api.campaigns.createFromTemplate(clientId, details, (err, res) => {
  if (err)  console.log(err);
});
```

Send a Draft Campaign

```javascript
var details = {
    "ConfirmationEmail": "string",    // single email address or array (max 5) of addresses that will receive the confirmation of the campaign being sent correctly
    "SendDate": "string"              // when to send the campaign. It can be "Immediately" or a date in YYYY-MM-DD HH:MM format
}

api.campaigns.sendDraft(details, (err, res) => {
  if (err)  console.log(err);
});
```
