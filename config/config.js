"use strict";

module.exports = function() {

    var env = process.env.NODE_ENV || 'development';

    var appConstants = applicationConfig();

    var obj = {
        application : {
            url : appConstants[env]['url'],
            host : appConstants[env]['host'],
            port : appConstants[env]['port']
        },
       
        server : {
            defaultHost : 'http://localhost:8001'
        }
    };
    
    if (!obj.application['host']) {
        throw new Error('Missing constant application.host. ' +
            'Check your enviroment variables NODE_HOST.');
    } else if (!obj.application['port']) {
        throw new Error('Missing constant application.port. ' +
            'Check your enviroment variable NODE_PORT.');
    } 


    return obj;

    

    function applicationConfig(){
        return {
            'production' : {
                'url' : 'http://' + process.env.NODE_HOST + ':' + 
                    process.env.NODE_PORT,
                'host' : process.env.NODE_HOST,
                'port' : process.env.NODE_PORT
            },
            'development' : {
                'url' : 'http://localhost:3000',
                'host' : 'localhost',
                'port' : 3000
            },
            'test' : {
                'url' : 'http://' + process.env.NODE_HOST + ':' + 
                process.env.NODE_PORT,
                'host' : process.env.NODE_HOST,
                'port' : process.env.NODE_PORT
            }
        };
    }
}();