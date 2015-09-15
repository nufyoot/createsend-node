var http        = require('http');
var https       = require('https');
var request     = require('request');
var querystring = require('querystring');
var version     = '0.7.0';
var fs          = require('fs');

module.exports = {
    request: function (secure, auth, method, uri, qs, params, callback) {
        if (auth) {
            if (auth.apiKey !== undefined) {
                auth = 'Basic ' + new Buffer(auth.apiKey + ':magic').toString('base64');
            } else if (auth.username !== undefined) {
                auth = 'Basic ' + new Buffer(auth.username + ':' + auth.password).toString('base64');
            } else if (auth.accessToken !== undefined) {
                auth = 'Bearer ' + auth.accessToken;
            }
        }

        callback = callback || function () {};

        if (qs) {
            uri += '?' + querystring.stringify(qs);
        }

        var options = {
            method: method,
            uri: uri,
            headers: {
                'Authorization': auth,
                'User-Agent': 'node-createsend/v' + version
            },
            body: JSON.stringify(params),
            timeout: 10000
        };

        if (secure) {
            options.rejectUnauthorized = true;
        }

        request(
            options,
            function (error, response, body) {
                if (error) { return callback(error); }

                var code = response.statusCode;
                if (code == 200 || code == 201 || code == 202) {
                    if (body) {
                        try {
                            callback(null, JSON.parse(body));
                        } catch (e) {
                            callback(new Error('Unable to parse JSON.  Error: ' + e + '\nBody:\n' + body));
                        }
                    } else {
                        callback(null);
                    }
                } else {
                    try {
                            callback(JSON.parse(body));
                        } catch (e) {
                            callback(new Error('Unable to parse JSON.  Error: ' + e + '\nBody:\n' + body));
                        }
                }
            }
        );
    }
}
