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

/**
 * s3cmd sync files from a local directory to a S3 bucket
 *
 * localDir = /local/directory/
 * s3Dir = s3://destination.bucket/
 *
 * @param localDir
 * @param s3Dir
 * @param callback
 */
exports.syncLocalToS3 = function(localDir, s3Dir, callback){

    var command = 'docker run --env aws_key='+key+' --env aws_secret='+secret+' --env cmd=sync-local-to-s3 --env DEST_S3='+s3Dir+'  -v '+localDir+':/opt/src garland/docker-s3cmd';

    shelljs.exec(command, {silent:true}, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);

        if(code !== 0)
            callback(true, null);
        else
            callback(null, true);
    });
};

/**
 * s3cmd sync files from S3 bucket to a local directory
 *
 * localDir = /local/directory/
 * s3Dir = s3://destination.bucket/
 *
 * @param localDir
 * @param s3Dir
 * @param callback
 */
exports.syncS3ToLocal = function(localDir, s3Dir, callback){

    var command = 'docker run --env aws_key='+key+' --env aws_secret='+secret+' --env cmd=sync-s3-to-local --env SRC_S3='+s3Dir+'  -v '+localDir+':/opt/dest garland/docker-s3cmd';

    console.log(command);

    shelljs.exec(command, {silent:true}, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);

        if(code !== 0)
            callback(true, null);
        else
            callback(null, true);
    });
};

/**
 * Checks if there is a Docker server installed locally
 */
exports.isThereALocalDockerServer = function(callback){

    var command = 'docker version';

    shelljs.exec(command, {silent:true}, function(code, output) {
        //console.log('Exit code:', code);
        //console.log('Program output:', output);

        var pattern = new RegExp("Server version");

        if(code !== 0)
            callback(true, null);
        else
            callback(null, pattern.test(output));
    });
};