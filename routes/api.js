"use strict";

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/ping',
            handler: function (request, reply) {
                reply({message: 'pong'})
                    .type('application/json');
            }
        },
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                // Show Home Page of API usage
                reply({message: 'This is an API endpoint for ZhuanWo.XYZ. '})
                    .type('application/json');
            }
        },
        {
            method: 'GET',
            path: '/{shortUrl}',
            handler: function (request, reply) {
                reply({message: 'This is an API endpoint for https://ZhuanWo.xyz/'+request.params.shortUrl+'. '})
                    .type('application/json');
            }
        },
        {
            method: 'GET',
            path: '/api/',
            handler: function (request, reply) {
                reply({message: 'This is an API endpoint for ZhuanWo. '})
                    .type('application/json');
            }
        }

    ];
}();
