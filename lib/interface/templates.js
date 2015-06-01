var Template = require('./template.js');

module.exports = Templates;

function Templates(createsend) {
    this.createsend = createsend;
}

Templates.prototype = {
    createTemplate: function (clientId, details, callback) {
        var createsend = this.createsend;
        createsend.post('templates/' + clientId + '.json', null, details, function (err, templateId) {
            if (err) { return callback(err); }
            callback(null, new Template(createsend, templateId));
        });
    },

    deleteTemplate: function (templateId, callback) {
        new Template(this.createsend, templateId).delete(callback);
    },

    getTemplateDetails: function (templateId, callback) {
        new Template(this.createsend, templateId).getDetails(callback);
    },

    updateTemplate: function (templateId, details, callback) {
        new Template(this.createsend, templateId).updateTemplate(details, callback);
    }
}