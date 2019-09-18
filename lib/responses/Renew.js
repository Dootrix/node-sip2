'use strict';

const ResponseMessage = require('../ResponseMessage');
const FeeType = require('../variables/FeeType');
const Currency = require('../variables/CurrencyType');
const MediaType = require('../variables/MediaType');

const messageCodes = require('../messageCodes');

/**
 * Renew Response
 * 
 * This will be called by ParseResponse.js and passed the message string.
 * It returns the SIP2 response parsed to an object
 */
class RenewResponse extends ResponseMessage {
    parse(message) {
        this.identifier = messageCodes.RENEW_RESPONSE;
        this.message = message;

        const data = {};

        // Required fixed length
        data.ok = this.intToBool(this.message.charAt(2));
        data.renewalOk = this.charToBool(this.message.charAt(3));
        data.magneticMedia = this.charToBool(this.message.charAt(4));
        data.desensitize = this.charToBool(this.message.charAt(5));
        data.transactionDate = this.parseDateTime(this.message.substring(6, 24));

        // Required variable length
        data.institutionId = this.parseVariable('AO', this.message.substring(24));
        data.patronIdentifier = this.parseVariable('AA', this.message.substring(24));
        data.itemIdentifier = this.parseVariable('AB', this.message.substring(24));
        data.titleIdentifier = this.parseVariable('AJ', this.message.substring(24));
        data.dueDate = this.parseVariable('AH', this.message.substring(24));

        // Optional fixed length
        const feeType = this.parseVariable('BT', this.message.substring(24));
        data.feeType = FeeType.parse(feeType);
        const securityInhibit = this.parseVariable('CI', this.message.substring(24));
        data.securityInhibit = this.charToBool(securityInhibit);
        const currency = this.parseVariable('BH', this.message.substring(24));
        data.currency = Currency.parse(currency);

        // Optional variable length
        data.feeAmount = this.parseVariable('BV', this.message.substring(24));

        // Optional fixed length
        const mediaType = this.parseVariable('CK', this.message.substring(24));
        data.mediaType = MediaType.parse(mediaType);

        // Optional variable length
        data.itemProperties = this.parseVariable('CH', this.message.substring(24));
        data.transactionId = this.parseVariable('BK', this.message.substring(24));
        data.screenMessage = this.parseVariable('AF', this.message.substring(24));
        data.printLine = this.parseVariable('AG', this.message.substring(24));

        return data;
    }
}

module.exports = RenewResponse;