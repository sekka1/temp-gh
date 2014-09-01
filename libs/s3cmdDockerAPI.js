/**
 * Uses this s3cmd Docker container: https://github.com/sekka1/docker-s3cmd
 *
 * This is assuming a Docker server is running locally.
 */

var shelljs = require('shelljs');

var key = '';
var secret = '';

exports.setAWSKeys = function(user_key, user_secret){
    key = user_key;
    secret = user_secret;
};

exports.syncLocalToS3 = function(){

    var command = 'docker run --env aws_key='+key+' --env aws_secret='+secret+' --env cmd=sync-local-to-s3 --env DEST_S3=s3://destination.bucket/  -v /local/directory/:/opt/src -d garland/s3cmd-container';

    shelljs.exec(command, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
    });
};

exports.syncS3ToLocal = function(){

    var command = 'docker run --env aws_key='+key+' --env aws_secret='+secret+' --env cmd=sync-s3-to-local --env SRC_S3=s3://source.bucket/ -v /local/direcoty/:/opt/dest garland/s3cmd-container';

    shelljs.exec(command, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
    });
};