/**
 * Handles reading and writing to AWS SQS
 *
 * Uses the Docker container: https://github.com/sekka1/AWS-REST-API-Server
 */

var https = require('https');
var http = require('http');

var host = 'localhost:8080';

/**
 * Get one item from the queue
 *
 */
exports.getOne = function(callback){

    // Do http call over to the AWS API server to get item
    console.log('aws-sqs.getOne');

    var endpoint = '/sqs/';
    var method = 'GET';

    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            //console.log(responseString);
            var responseObject = JSON.parse(responseString);
            callback(responseObject);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);

    });

    //req.send();
    req.end();

};

/**
 * Put an item into the queue
 */
exports.putOne = function(messageObject, callback){

    var endpoint = '/sqs/sendMessage';
    var method = 'POST';

    var dataString = JSON.stringify(messageObject);

    console.log('dataString: ' + dataString);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
    };

    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf-8');
        var statusCode = res.statusCode;

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log('queuesPOST status code: '+statusCode);
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            //success(responseObject);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);

    });

    req.write(dataString);
    req.end();
};