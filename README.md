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
const exampleVariables = require('./exampleVariables');
const serverIP = exampleVariables.serverIP;
const serverPort = exampleVariables.serverPort;

const sip2connection = new Connection(serverIP, serverPort);

/**
 *  Connect
 */
const connect = async () => {
    await sip2connection.connect();
}

/**
 *  Disconnect
 */
const disconnect = async () => {
    await sip2connection.close();
}

/** 
 * Login Request
 */
const requestLogin = async (user, pass, institutionId) => {
    console.log('Logging in...');
    const loginRequest = new SIP2.LoginRequest(user, pass, institutionId);
    loginRequest.sequence = 1;
    return await sip2connection.send(loginRequest.getMessage());
}

/** 
 * Patron Information Request
 */
const requestPatronInformation = async (patronID, patronPassword, institutionId, terminalPassword, requestType = 'charged') => {
    console.log('Requesting Patron Information...')
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
    checkoutRequest.institutionId = exampleVariables.institutionID;
    checkoutRequest.terminalPassword = exampleVariables.terminalPassword;
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
    console.log('SC Status...')
    const scStatusRequest = new SIP2.SCStatusRequest(statusCode, maxPrintWidth, protocolVersion);
    return await sip2connection.send(scStatusRequest.getMessage());
}

/** Request ACS Resend
 */
const requestACSResend = async () => {
    console.log('Resend');
    const acsResendrequest = new SIP2.RequestResendRequest();
    return await sip2connection.send(acsResendrequest.getMessage());
}

/** 
 * Fee Paid
 */
const requestFeePaid = async (patronID, institutionId, feeAmount) => {
    console.log('Requesting fee paid...');
    const feePaidRequest = new SIP2.FeePaidRequest('01', '00', 'GBP', feeAmount);
    feePaidRequest.institutionId = institutionId;
    feePaidRequest.patronIdentifier = patronID;
    return await sip2connection.send(feePaidRequest.getMessage());
}

/** Item Information
 */
const requestItemInformation = async (itemID) => {
    console.log('Requesting item information...');
    const itemInformationRequest = new SIP2.ItemInformationRequest(itemID);
    return await sip2connection.send(itemInformationRequest.getMessage());
}

/** 
 * Renew
 */
const requestRenew = async (patronID, itemID, institutionId, patronPassword) => {
    console.log('Requesting single renew...');
    const renewRequest = new SIP2.RenewRequest(institutionId, patronID, patronPassword, '20190910    000000', itemID);
    return await sip2connection.send(renewRequest.getMessage());
}

/** 
 * Renew All
 */
const requestRenewAll = async (patronID, institutionId) => {
    console.log('Requesting renew all...');
    const renewAllRequest = new SIP2.RenewAllRequest(patronID, institutionId);
    return await sip2connection.send(renewAllRequest.getMessage());
}
```