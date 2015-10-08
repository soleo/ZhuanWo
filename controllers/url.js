'use strict';

var hapi            = require('hapi');
var boom            = require('boom');
var joi             = require('joi');
var pack            = require('../package');
var _ = require('underscore');

function UrlController () {};

UrlController.prototype = (function() {
    return {
        encodeUrl: function encodeUrl(request, reply) {
              
            var shortUrl = "abc";
            // write encode method

            return reply(shortUrl);

        },

        decodeUrl: function decodeUrl(request, reply) {
            var longUrl = 'http://xinjiangshao.com';
            
            // write decode method
            if(_.isEmpty(request.query.preview)){
                return reply.redirect(longUrl);
            }else{
                return reply(longUrl);
            }
            
        }

    }

})();

var urlController = new UrlController();
module.exports = urlController;