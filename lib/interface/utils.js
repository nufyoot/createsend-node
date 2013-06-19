var request     = require('request')
var querystring = require('querystring');
var version     = '0.7.0';

module.exports = {
    request: function (auth, method, uri, qs, params, callback) {
        if (auth) {
            if (auth.apiKey !== undefined) {
                auth = 'Basic ' + new Buffer(auth.apiKey + ':magic').toString('base64');
            } else if (auth.username !== undefined) {
                auth = 'Basic ' + new Buffer(auth.username + ':' + auth.password).toString('base64');
            }
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
                    'User-Agent': 'node-createsend/v' + version 
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