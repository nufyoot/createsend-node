module.exports=function Transactional(createsend) {

    function txResponseCallback(error, results, callback) {
        if (error) {
            callback(error);
        } else {
            callback(null, results);
        }
    }

    function deleteNullProperties(details) {
        for (key in details) {
            if (!details[key]) {
                delete details[key];
            }
        }
    }

    //  Get a list of smart transactional emails, filtered by status, for a given clientID
    function smartEmailList(details, callback) {
        deleteNullProperties(details);
        createsend.get('transactional/smartemail', details, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Get the details for a smart transactional email
    function smartEmailDetails(details, callback) {
        createsend.get('transactional/smartemail/'+details.smartEmailID, null, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Deliver a smart email. Properties in the data property will be available in your email as variables which can be referenced using our Template Language.
    function sendSmartEmail(details, callback) {
        createsend.post('transactional/smartemail/'+details.smartEmailID+'/send', null, details, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Send an email by providing your own content
    function sendClassicEmail(details, callback) {
        deleteNullProperties(details);
        createsend.post('transactional/classicEmail/send', details.clientID, details, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Get a list of classic email groups
    function classicEmailGroupList(details, callback) {
        createsend.get('transactional/classicEmail/groups', details, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Get the delivery and engagement statistics, optionally filter by smart email or classic group.
    function statistics(details, callback) {
        deleteNullProperties(details);
        createsend.get('transactional/statistics', details, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Returns list of sent messages (basic or smart), filtered by tag, email, date, etc. Returns the details of the message, including an ID which can be queried for status.
    function messageTimeline(details, callback) {
        deleteNullProperties(details);
        createsend.get('transactional/messages', details, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Get the message details, no matter how it was sent. Includes status.
    function messageDetails(details, callback) {
        createsend.get('transactional/messages/'+details.messageID, details, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    //  Resend the message
    function messageResend(details, callback) {
        createsend.post('transactional/messages/'+details.messageID+'/resend', null, null, function(error, results) {
            txResponseCallback(error, results, callback);
        }, true);
    }

    return {
        createsend: createsend,
        smartEmailList: smartEmailList,
        smartEmailDetails: smartEmailDetails,
        sendSmartEmail: sendSmartEmail,
        sendClassicEmail: sendClassicEmail,
        classicEmailGroupList: classicEmailGroupList,
        statistics: statistics,
        messageTimeline: messageTimeline,
        messageDetails: messageDetails,
        messageResend: messageResend 
    };
}