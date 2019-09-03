# SIP2 communication for Node.js
## Installation
```bash
$ npm install sip2
```

## Example
```
const SIP2 = require('./index');
const Connection = SIP2.Connection;

// Variables
const variablesForExamples = require('./variablesForExamples');
const serverIP = variablesForExamples.serverIP;
const serverPort = variablesForExamples.serverPort;

const sip2connection = new Connection(serverIP, serverPort);

/**
 *  Connect
 */
const connect = async () => {
    await sip2connection.connect();
}

/** 
 * Login Request
 */
const requestLogin = async (user, pass, institutionId) => {
    const loginRequest = new SIP2.LoginRequest(user, pass, institutionId);
    loginRequest.sequence = 1;
    return await sip2connection.send(loginRequest.getMessage());
}

/** 
 * Patron Information Request
 */
const requestPatronInformation = async (patronID, patronPassword, institutionId, terminalPassword, requestType = 'charged') => {
    const patronInformationRequest = new SIP2.PatronInformationRequest(requestType);
    patronInformationRequest.sequence = 2;
    patronInformationRequest.institutionId = institutionId;
    patronInformationRequest.patronIdentifier = patronID;
    patronInformationRequest.patronPassword = patronPassword;
    patronInformationRequest.terminalPassword = terminalPassword;
    return await sip2connection.send(patronInformationRequest.getMessage());
}

/** 
 * Checkout
 */
const requestCheckout = async (itemID, patronID) => {
    const checkoutRequest = new SIP2.CheckoutRequest('Y', '20190929    000000', itemID, null, 'N');
    checkoutRequest.patronIdentifier = patronID;
    return await sip2connection.send(checkoutRequest.getMessage());
}

/** 
 * Checkin
 */
const requestCheckin = async (itemID, institutionId) => {
    const checkinRequest = new SIP2.CheckinRequest('20190929    0000000', institutionId, itemID);
    return await sip2connection.send(checkinRequest.getMessage());
}

/** 
 * SC Status
 */
const requestSCStatus = async (statusCode = '1', maxPrintWidth = '000', protocolVersion = '2.00') => {
    const scStatusRequest = new SIP2.SCStatusRequest(statusCode, maxPrintWidth, protocolVersion);
    return await sip2connection.send(scStatusRequest.getMessage());
}

/** Request ACS Resend
 */
const requestACSResend = async () => {
    const acsResendrequest = new SIP2.RequestResendRequest();
    return await sip2connection.send(acsResendrequest.getMessage());
}

/** 
 * Fee Paid
 */
const requestFeePaid = async (patronID, institutionId, feeAmount) => {
    const feePaidRequest = new SIP2.FeePaidRequest('01', '00', 'GBP', feeAmount);
    feePaidRequest.institutionId = institutionId;
    feePaidRequest.patronIdentifier = patronID;
    return await sip2connection.send(feePaidRequest.getMessage());
}

/** Item Information
 */
const requestItemInformation = async (itemID) => {
    const itemInformationRequest = new SIP2.ItemInformationRequest(itemID);
    return await sip2connection.send(itemInformationRequest.getMessage());
}

/** 
 * Renew
 */
const requestRenew = async (patronID, itemID, institutionId, patronPassword) => {
    const renewRequest = new SIP2.RenewRequest(institutionId, patronID, patronPassword, '20190910    000000', itemID);
    return await sip2connection.send(renewRequest.getMessage());
}

/** 
 * Renew All
 */
const requestRenewAll = async (patronID, institutionId) => {
    const renewAllRequest = new SIP2.RenewAllRequest(patronID, institutionId);
    return await sip2connection.send(renewAllRequest.getMessage());
}
```

## Tests
To run the test suite, first install the dependencies then run `npm test`:
```bash
$ npm install
$ npm test
```
