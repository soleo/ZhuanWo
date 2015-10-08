'use strict';

var fs              = require('fs'),
    path            = require('path'),
    // hapi            = require('hapi'),
    // boom            = require('boom'),
    // joi             = require('joi'),
    utils           = require('../lib/util.js'),
    pack            = require('../package');

function index(request, reply) {
    utils.getMarkDownHTML(__dirname.replace('/lib','') + '/README.md', function(err, data){
        reply.view('swagger.html', {
            title: pack.name + ' &#151; Yet Another URL Shorten Service',
            markdown: data
        });
    });
}

function license(request, reply) {
    reply.view('license.html', {});
}


exports.index = index;
exports.license = license;