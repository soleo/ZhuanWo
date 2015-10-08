"use strict";

var _ = require('underscore');
var Joi = require('joi');

function UrlValidate(){};

UrlValidate.prototype = (function(){

    return {
        encodeUrl: {
            params: (function params() {
                
                return {
                    
                };
            })(),
            query: (function query(){
                return {
                    longUrl: Joi.string().uri({
                          scheme: [
                            'git',
                            /git\+https?/
                          ]
                        }).required().description('Long URL')
                }
            })()
       
        },
        decodeUrl: {
            params: (function params (argument) {
                return {
                    shortUrl: Joi.string().required().description('Short URL')
                };
            })(),
            query: (function query(){
                return {
                    preview: Joi.string().description('enable preview')
                };
            })()
        }
    }
})();

var urlValidate = new UrlValidate();
module.exports = urlValidate;
