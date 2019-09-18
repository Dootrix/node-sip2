'use strict';

const net = require('net');
const parseResponse = require('./parseResponse');
/**
 * Create an instance of this class to connect, send, and receive SIP2 messages.
 * 
 * @param  {String} host - Address of the LMS server
 * @param  {Number} port - The port that SIP2 is listening on
 */
class Connection {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.socket = null;
    }

    connect() {
        this.socket = new net.Socket();
        this.socket.setEncoding('utf8');

        return new Promise(resolve => {
            this.socket.connect(this.port, this.host, resolve());
        });
    }

    send(request) {
        if (!this.socket) {
            throw new Error('No open SIP2 socket connection');
        }

        return new Promise((resolve, reject) => {
            this.socket.once('data', data => resolve(parseResponse(data)));
            this.socket.once('error', err => reject(err));
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
