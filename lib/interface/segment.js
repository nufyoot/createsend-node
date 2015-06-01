module.exports = Segment;

function Segment(createsend, segmentId) {
    this.createsend = createsend;
    this.segmentId = segmentId;
}

Segment.prototype = {
    addRule: function (details, callback) {
        this.createsend.post('segments/' + this.segmentId + '/rules.json', null, details, callback);
    },

    delete: function (callback) {
        this.createsend.delete('segments/' + this.segmentId + '.json', null, null, details, callback);
    },

    deleteRule: function (callback) {
        this.createsend.delete('segments/' + this.segmentId + '/rules.json', null, null, callback);
    },

    getActiveSubscribers: function (filter, callback) {
        this.createsend.get('segments/' + this.segmentId + '/active.json', filter, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('segments/' + this.segmentId + '.json', null, null, callback);
    },

    update: function (details, callback) {
        this.createsend.put('segments/' + this.segmentId + '.json', null, details, callback);
    }
};
