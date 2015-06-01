var Segment = require('./segment.js');

module.exports = Segments;

function Segments(createsend) {
    this.createsend = createsend;
}

Segments.prototype = {
    addSegmentRule: function (segmentId, details, callback) {
        new Segment(this.createsend, segmentId).addRule(details, callback);
    },

    createSegment: function (listId, details, callback) {
        var createsend = this.createsend;
        createsend.post('segments/' + listId + '.json', null, details, function (err, segmentId) {
            if (err) { return callback(err); }
            callback(null, new Segment(createsend, segmentId));
        });
    },

    deleteSegment: function (segmentId, callback) {
        new Segment(this.createsend, segmentId).delete(callback);
    },

    deleteSegmentRule: function (segmentId, callback) {
        new Segment(this.createsend, segmentId).deleteRule(callback);
    },

    getActiveSubscribers: function (segmentId, filter, callback) {
        new Segment(this.createsend, segmentId).getActiveSubscribers(filter, callback);
    },

    getSegmentDetails: function (segmentId, callback) {
        new Segment(this.createsend, segmentId).getDetails(callback);
    },

    updateSegment: function (segmentId, details, callback) {
        new Segment(this.createsend, segmentId).update(details, callback);
    }
};