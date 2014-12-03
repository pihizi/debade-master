var amqp = require('amqplib');
var deferred = require('deferred');
var log = require('./log').log;

var url = (function() {
    var iConfig = require('./config').get('master');
    var iServer = iConfig['server'] || 'localhost';
    var iUser = iConfig['user'] || 'guest';
    var iPassword = iConfig['password'] || 'guest';
    var iPort = iConfig['port'] || '5672';
    return 'amqp://' + iUser + ':' + iPassword + '@' + iServer + ':' + iPort;
})();

var connection, channel;
var getHandler = function(pDef) {
    var iDef = pDef || deferred();
    if (!channel) {
        connection = amqp.connect(url).then(function(pConn) {
            channel = pConn.createChannel();
            channel.then(function(pChannel) {
                iDef.resolve();
            });
        }, function(error) {
            log(error);
            getHandler(iDef);
        });
    }
    else {
        iDef.resolve();
    }
    return iDef.promise;
};

exports.send = function(pExchangeName, pMessage) {
    getHandler().then(function() {
        channel.then(function(pChannel) {
            var iOk = pChannel.assertExchange(pExchangeName, 'fanout', {
                durable: false,
                autoDelete: true
            });
            iOk.then(function() {
                pChannel.publish(pExchangeName, '', new Buffer(pMessage));
            });
        });
    });
};

