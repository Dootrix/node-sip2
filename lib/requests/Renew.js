'use strict';

const RequestMessage = require('../RequestMessage');

const messageCodes = require('../messageCodes');

/**
 * Renew a single item
 * 
 * @param  {String} institutionId - The id of the location
 * @param  {String} patronIdentifier - Borrower's ID
 * @param  {String} patronPassword - Borrower's password
 * @param  {String} nbDueDate - No Block Due Date
 * @param  {String} itemID - ID of item to renew
 * @param  {String} titleID - Title of item to renew (optional)
 * @param  {String} thirdPartyAllowed - default 'Y'
 * @param  {String} noBlock - default 'N'
 * @param  {String} terminalPassword - Password of the SIP2 terminal
 * @param  {String} itemProperties - Properties of the item (optional)
 * @param  {String} feeAcknowledged - If there is a fee for this item, has the user paid that fee? Default = 'N'
 */
class RenewRequest extends RequestMessage {
    constructor(institutionId, patronIdentifier, patronPassword, nbDueDate, 
        itemID, titleID, thirdPartyAllowed = 'Y', noBlock = 'N', terminalPassword, itemProperties, feeAcknowledged = 'N') {
        super(messageCodes.RENEW_REQUEST);

        this.thirdPartyAllowed = thirdPartyAllowed;
        this.noBlock = noBlock;
        this.transactionDate = RequestMessage.getDateTime();
        this.nbDueDate = nbDueDate;
        this.institutionId = institutionId;
        this.patronIdentifier = patronIdentifier;

        // Optional
        this.patronPassword = patronPassword;
        this.itemIdentifier = itemID;
        this.titleIdentifier = titleID;
        this.terminalPassword = terminalPassword;
        this.itemProperties = itemProperties;
        this.feeAcknowledged = feeAcknowledged;
    }

    buildMessage() {
        this.append(this.thirdPartyAllowed);
        this.append(this.noBlock);
        this.append(this.transactionDate);
        this.append(this.nbDueDate);
        this.append('AO');
        this.append(this.institutionId);
        this.append('|AA');
        this.append(this.patronIdentifier);
        if (this.patronPassword) {
            this.append('|AD');
            this.append(this.patronPassword);
        }
        if (this.itemIdentifier) {
            this.append('|AB');
            this.append(this.itemIdentifier);
        }
        if (this.titleIdentifier) {
            this.append('|AJ');
            this.append(this.titleIdentifier);
        }
        if (this.terminalPassword) {
            this.append('|AC');
            this.append(this.terminalPassword);
        }
        if (this.itemProperties) {
            this.append('|CH');
            this.append(this.itemProperties);
        }
        if (this.feeAcknowledged) {
            this.append('|BO');
            this.append(this.feeAcknowledged);
        }
    }
}

module.exports = RenewRequest;