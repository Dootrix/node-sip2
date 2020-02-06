'use strict';

const net = require('net');
const parseResponse = require('./parseResponse');
/**
 * Create an instance of this class to connect, send, and receive SIP2 messages.
 * 
 * @param  {string} host - Address of the LMS server
 * @param  {number} port - The port that SIP2 is listening on
 * @param  {number} timeoutSeconds - Set the timeout for requests
 */
class Connection {
    constructor(host, port, timeoutSeconds = 0) {
        this.host = host;
        this.port = port;
        this.timeout = timeoutSeconds * 1000;
        this.socket = null;
    }

    connect() {
        this.socket = new net.Socket();
        this.socket.setEncoding('utf8');

        return new Promise((resolve, reject) => {

            if (this.timeout !== 0) {
                this.socket.setTimeout(this.timeout);
            }

            this.socket.once('connect', () => resolve());
            this.socket.once('error', err => reject(err));
            this.socket.connect(this.port, this.host);
        });
    }

    send(request) {
        if (!this.socket) {
            throw new Error('No open SIP2 socket connection');
        }

        return new Promise((resolve, reject) => {
            this.socket.once('data', data => resolve(parseResponse(data)));
            this.socket.once('error', err => reject(err));
            this.socket.once('timeout', () => {
                this.close();
                reject({ message: 'SIP2 request timed out' })
            })
            this.socket.write(request);
        })
    }

    close() {
        if (this.socket) {
            this.socket.end();
        }
    }
}

module.exports = Connection;
