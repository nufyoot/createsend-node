var request     = require('request')
var querystring = require('querystring');

module.exports = {
  request: function (auth, method, uri, qs, params, callback) {
    if (auth.apiKey !== undefined) {
      auth = 'Basic ' + new Buffer(auth.apiKey + ':magic').toString('base64');
    }

    callback = callback || function () {};

    if (qs) {
      uri += '?' + querystring.stringify(qs);
    }

    request(
      { 
        method: method,
        uri: uri,
        headers: { 
          'Authorization': auth,
          'User-Agent': 'node-createsend/v' + exports.version 
        },
        body: JSON.stringify(params) 
      },
      function (error, response, body) {
        var code = response.statusCode;
        if (code == 200 || code == 201) {
          if (body) {
            callback(null, JSON.parse(body));
          } else {
            callback(null);
          }
        } else {
          callback(JSON.parse(body));
        }
      }
    );
  }
}