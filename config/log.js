/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

var winston = require('winston');

/*
    Sails.js Winston logger config
    I was having trouble getting the logfile output to be verbose, having copied several from the web I finally came
    up with this setup after reading the old Captian's Log configuration. Current problem is the doubling of verbose.
    ex: verbose: verbose: Grunt :: Running "sails-linker:devStyles" (sails-linker) task
 */
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)( {
            level: 'info',
            colorize: true,
            json: false
        } ),
        new (winston.transports.File)({
            filename: 'logs/sails.log',
            level: 'info',
            colorize: false,
            json: false
        })
    ]
});

module.exports.log = {
    /***************************************************************************
     *                                                                          *
     * Valid `level` configs: i.e. the minimum log level to capture with        *
     * sails.log.*()                                                            *
     *                                                                          *
     * The order of precedence for log levels from lowest to highest is:        *
     * silly, verbose, info, debug, warn, error                                 *
     *                                                                          *
     * You may also set the level to "silent" to suppress all logs.             *
     *                                                                          *
     ***************************************************************************/

    level:'info',
    colorize: false,
    json: false,
    custom: logger
    
};
