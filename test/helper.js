var fakeweb = require('node-fakeweb');
var fs      = require('fs');

fakeweb.allowNetConnect = false;

module.exports = {
  baseScheme: 'https',
  baseUri: 'api.createsend.com',
  stubRequest: function (uri, responseFile) {
    this.stubRawRequest(this.baseScheme + '://' + this.baseUri + (this.baseScheme == 'https' ? ':443' : '') + '/api/v3/' + uri, responseFile);
  },
  stubRawRequest: function (uri, responseFile) {
    fakeweb.registerUri({
      uri: uri,
      body: responseFile ? fs.readFileSync(__dirname + '/fixtures/' + responseFile) : ''
    });
  }
}