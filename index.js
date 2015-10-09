"use strict";

var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var Blipp = require('blipp');
var Pack = require('./package');
var Good = require('good');
var _ = require('underscore');
var config = require('./config/config');

var routes = require('./routes');

var host = config.application['host'];
var port = config.application['port'];
var server = new Hapi.Server();

server.connection({ host: host, port: port });
// setup swagger options
var swaggerOptions = {
    apiVersion: Pack.version,
    info: {
        title: 'ZhuanWo.Xyz',
        description: 'This Web API was built to for URL Shortener Service',
        contact: 'shaoxinjiang@gmail.com',
        license: 'MIT',
        licenseUrl: '/license'
    }
};

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
        
    
        server.register([
        Inert,
        Vision,
        Blipp,
        {
            register: require('hapi-swagger'), 
            options: swaggerOptions
        }
        ], function (err) {
            if(err)
                throw err;
            // Start Server
            if (process.env.NODE_ENV !== 'test') {
               server.start(function () {
                    server.log('info', 'Server running at: ' + server.info.uri);
                });

            }

           
        });
        // Set Up Routes
        for (var route in routes) {
            server.route(routes[route]);
        }
        // add templates support with handlebars
        server.views({
            path: 'templates',
            engines: { html: require('handlebars') },
            partialsPath: './templates/withPartials',
            helpersPath: './templates/helpers',
            isCached: false
        });
        

        module.exports = server; 
});