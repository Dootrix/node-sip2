'use strict';

const RequestMessage = require('../RequestMessage');

const messageCodes = require('../messageCodes');
/**
 * Attempt to renew all items checked out by a user. This will return which ones were successful.
 * 
 * @param  {String} patronIdentifier - Borrower's id
 * @param  {String} institutionId - Location's id
 */
class RenewAllRequest extends RequestMessage {
    constructor(patronIdentifier, institutionId) {
        super(messageCodes.RENEW_ALL_REQUEST);

        this.patronIdentifier = patronIdentifier;
        this.transactionDate = RequestMessage.getDateTime();
        this.institutionId = institutionId;
    }

    buildMessage() {
        this.append(this.transactionDate);
        if (!this.institutionId) {
            throw new Error('Renew All requires an institution ID.');
        }
        this.append('AO');
        this.append(this.institutionId);
        if (!this.patronIdentifier) {
            throw new Error('Renew All requires a patrion ID.');
        }
        this.append('|AA')
        this.append(this.patronIdentifier);
        if (this.patronPassword) {
            this.append('|AD');
            this.append(this.patronPassword);
        }
        if (this.terminalPassword) {
            this.append('|AC');
            this.append(this.terminalPassword);
        }
        if (this.feeAcknowledged) {
            this.append('|BO');
            this.append(feeAcknowledged);
        }
    }
}

module.exports = RenewAllRequest;