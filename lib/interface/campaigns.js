var CreateSend = require('../createsend');

/**
 * # .campaignCreate(clientId, campaign, [callback])
 *
 * Creates a new campaign for a client.
 * 
 * @name campaignCreate
 * @param {String} clientId
 * @param {Object} campaign details
 * @param {Function} callback (optional)
 * @see http://www.campaignmonitor.com/api/campaigns/#creating_a_draft_campaign
 * @api public
 */
CreateSend.prototype.campaignCreate = function (clientId, campaign, callback) {
    this.execute('POST', 'campaigns/' + clientId, null, campaign, callback);
}

/**
 * # .campaignSend(campaignId, confirmationEmail, sendDate)
 *
 * Sends a campaign
 *
 * @name campaignSend
 * @param {String} campaignId
 * @param {String} confirmationEmail
 * @param {String} sendDate
 * @see http://www.campaignmonitor.com/api/campaigns/#sending_a_draft_campaign
 * @api public
 */
CreateSend.prototype.campaignSend = function (campaignId, confirmationEmail, sendDate) {
    sendDate = sendDate || "immediately";
    var payLoad = {
        "ConfirmationEmail": confirmationEmail,
        "SendDate": sendDate
    };
    this.execute('POST', 'campaigns/' + campaignId + '/send', null, payLoad, callback);
}