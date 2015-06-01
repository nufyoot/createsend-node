module.exports = Template;

function Template(createsend, templateId) {
    this.createsend = createsend;
    this.templateId = templateId;
}

Template.prototype = {
    delete: function (callback) {
        this.createsend.delete('templates/' + this.templateId + '.json', null, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('templates/' + this.templateId + '.json', null, null, callback);
    },

    update: function (details, callback) {
        this.createsend.put('templates/' + this.templateId + '.json', null, details, callback);
    }
};