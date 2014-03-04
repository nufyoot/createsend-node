# CreateSend API Wrapper

[![Build Status](https://travis-ci.org/nufyoot/createsend-node.png?branch=master)](https://travis-ci.org/nufyoot/createsend-node) [![Dependency Status](https://gemnasium.com/nufyoot/createsend-node.png)](https://gemnasium.com/nufyoot/createsend-node) [![Coverage Status](https://coveralls.io/repos/nufyoot/createsend-node/badge.png?branch=master)](https://coveralls.io/r/nufyoot/createsend-node?branch=master)

### Installation

```
npm install createsend-node
```

### Authenticating

The only supported authentication, for now, is the API key. Support for OAuth will be coming shortly.

```
var createsend = require('createsend-node');
var auth = { apiKey: 'your api key' };
var api = new createsend(auth);
```

### Account based actions

Get the list of clients.
```
api.account.getClients(
  function (err, clientList) { 
    // clientList will look like the response from 
    // http://www.campaignmonitor.com/api/account/#getting_your_clients
  }
);
```
