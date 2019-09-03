'use strict';

const ResponseMessage = require('../ResponseMessage');

class RenewAllResponse extends ResponseMessage {
    parse(message) {
        this.identifier = '66';
        this.message = message;

        const data = {};

        // Required fixed length
        data.ok = this.intToBool(this.message.charAt(2));
        data.renewedCount = this.stringToInt(this.message.substring(3, 7));
        data.unrenewedCount = this.stringToInt(this.message.substring(7, 11));
        data.transactionDate = this.parseDateTime(this.message.substring(11, 29));
        
        // Required variable length
        data.institutionID = this.parseVariable('AO', this.message.substring(29));

        // Optional variable length
        data.renewedItems = this.parseVariableMulti('BM', this.message.substring(29));
        data.unrenewedItems = this.parseVariableMulti('BN', this.message.substring(29));
        data.screenMessage = this.parseVariable('AF', this.message.substring(29));
        data.printLine = this.parseVariable('AG', this.message.substring(29));

        data.checksum = this.parseChecksum(this.message);

        return data;
    }
}

module.exports = RenewAllResponse;