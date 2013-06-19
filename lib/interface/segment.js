module.exports = Segment;

function Segment(createsend, segmentId) {
    this.createsend = createsend;
    this.segmentId = segmentId;
}

Segment.prototype = {
    addRule: function (details, callback) {
        this.createsend.post('segments/' + this.segmentId + '/rules', null, details, callback);
    },

    delete: function (callback) {
        this.createsend.delete('segments/' + this.segmentId, null, null, details, callback);
    },

    deleteRule: function (callback) {
        this.createsend.delete('segments/' + this.segmentId + '/rules', null, null, callback);
    },

    getActiveSubscribers: function (filter, callback) {
        this.createsend.get('segments/' + this.segmentId + '/active', filter, null, callback);
    },

    getDetails: function (callback) {
        this.createsend.get('segments/' + this.segmentId, null, null, callback);
    },

    update: function (details, callback) {
        this.createsend.put('segments/' + this.segmentId, null, details, callback);
    }
};