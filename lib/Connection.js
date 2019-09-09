'use strict';

const net = require('net');
const parseResponse = require('./parseResponse');

class Connection {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.socket = null;
    }

    connect() {
        this.socket = new net.Socket();
        this.socket.setEncoding('utf8');

        this.socket.on('end', () => {
            console.log('Disconnected from SIP2 server');
        });

        this.socket.on('close', () => {
            console.log('SIP2 connection closed');
        });

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
            console.log('Disconnecting.');
            this.socket.end();
        }
    }
}

module.exports = Connection;
