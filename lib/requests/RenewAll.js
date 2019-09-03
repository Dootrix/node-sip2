'use strict';

const RequestMessage = require('../RequestMessage');

class RenewAllRequest extends RequestMessage {
    constructor(patronIdentifier, institutionId) {
        super('65');

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