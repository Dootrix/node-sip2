'use strict';

const RequestMessage = require('../RequestMessage');

class RenewRequest extends RequestMessage {
    constructor(institutionId, patronIdentifier, patronPassword, nbDueDate, 
        itemID, titleID, thirdPartyAllowed = 'Y', noBlock = 'N', terminalPassword, itemProperties, feeAcknowledged) {
        super('29');

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