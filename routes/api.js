'use strict';
var handlers    = require('../lib/handlers');
var hapi        = require('hapi');
var Joi         = require('joi');
var urlController = require('../controllers/url');
var urlValidate = require('../validate/url');
var standardHTTPErrors = [
    { code: 400, message: 'Bad Request' },
    { code: 500, message: 'Internal Server Error'}
];

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/ping',
            config: {
                description: 'Ping Server',
                tags: ['api'],
                notes: ['Return Pong if server is available.'],
                plugins: {
                    'hapi-swagger': {
                        responseMessages: standardHTTPErrors
                    }
                },
                handler: function (request, reply) {
                    reply({message: 'pong'})
                        .type('application/json');
                }
            }
           
        },
        {
            method: 'GET',
            path: '/',
            config:{
                handler: handlers.index
            }
        },
        {
            method: 'GET',
            path: '/license',
            config: {
                handler: handlers.license
            }
        },
        {
            method: 'GET',
            path:'/assets/{path*}',
            config: {
                handler: {
                    directory: {
                        path: './assets/',
                        listing: false,
                        index: true
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/images/{file*}',
            config: {
                handler: {
                    directory:{
                        path:'./node_modules/hapi-swagger/public/swaggerui/images'
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/{shortUrl}',
            config: {
                handler: urlController.decodeUrl,
                validate: urlValidate.decodeUrl,
                description: 'Redirect to Long URL',
                tags: ['api'],
                notes: ['URL Redirection'],
                plugins: {
                    'hapi-swagger': {
                        responseMessages: standardHTTPErrors
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/api/',
            config:{
                handler: urlController.encodeUrl,
                validate: urlValidate.encodeUrl,
                description: 'Encode Long URL',
                tags: ['api'],
                notes: ['Encode Long URL, return Short URL'],
                plugins: {
                    'hapi-swagger': {
                        responseMessages: standardHTTPErrors
                    }
                }
            }
        }

    ];
}();
