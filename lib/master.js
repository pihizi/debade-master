var redis = require('redis');
var log = require('./log').log;

var run = function() {
    var redis_channel;

    var client = (function() {
        var iConfig = require('./config').get('redis');
        var iPort = iConfig['port'] || 6379;
        var iHost = iConfig['host'] || 'localhost';
        redis_channel = iConfig['channel'] || 'debade';
        return redis.createClient(iPort, iHost);
    })();

    client.on('message', function(pChannel, pMessage) {
        var iData = JSON.parse(pMessage);
        var iChannel = iData.channel;
        var iType = iData.type;
        var iContent = iData.content || {};
        var iMessage = iContent.data;
        var iTime = iContent.time;
        var iMQ;

        switch (iType) {
            case 'message':
            default:
                iMQ = require('./rabbitMQ');
        }

        iMQ.send(iChannel, JSON.stringify({data: iMessage}));
    });

    client.subscribe(redis_channel);

};

exports.run = run;
