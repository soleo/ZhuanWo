'use strict';

module.exports = function() {

    var env = process.env.NODE_ENV || 'development';

    var appConstants = applicationConfig();

    var obj = {
        application : {
            url : appConstants[env]['url'],
            host : appConstants[env]['host'],
            port : appConstants[env]['port'],
            database_url: appConstants[env]['database_url']
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
                'url' : 'https://' + process.env.NODE_HOST + ':' + 
                    process.env.NODE_PORT,
                'host' : process.env.NODE_HOST,
                'port' : process.env.PORT,
                'database_url': process.env.DATABASE_URL
            },
            'development' : {
                'url' : 'http://localhost:3000',
                'host' : 'localhost',
                'port' : 5000,
                'database_url': process.env.DATABASE_URL
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