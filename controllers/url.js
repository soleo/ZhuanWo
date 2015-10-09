'use strict';

var hapi            = require('hapi');
var boom            = require('boom');
var joi             = require('joi');
var pack            = require('../package');
var _ = require('underscore');
var util = require('../lib/util');

function UrlController () {};

UrlController.prototype = (function() {
    return {
        encodeUrl: function encodeUrl(request, reply) {
            var longUrl = request.query.longUrl;  
            // Check LongUrl exsit in db first
            var increment_uid = 11;
            // geneerta
            var segmentId = util.alphaID(increment_uid, false, 3, 'mysecretkey');
            // write encode method
            //console.log(segmentId);
            var shortUrl = 'http://'+request.headers.host + '/' + segmentId;
            return reply(shortUrl);

        },

        decodeUrl: function decodeUrl(request, reply) {
            var longUrl = 'http://xinjiangshao.com';
           
            console.log(longUrl);
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