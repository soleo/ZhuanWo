"use strict";

var Hapi = require('hapi');
var Good = require('good');
var _ = require('underscore');
var config = require('./config/config');


var host = config.application['host'];
var port = config.application['port'];
var server = new Hapi.Server();

server.connection({ host: host, port: port });


server.register({
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    }, function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

           

        // Start Server
        if (process.env.NODE_ENV !== 'test') {
           server.start(function () {
                server.log('info', 'Server running at: ' + server.info.uri);
            });

        }
        
        module.exports = server;

    
});