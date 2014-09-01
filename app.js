/**
 *
 *
 *
 */
var async = require('async');

var lockFile = require('./libs/lockFile.js');
var mq = require('./libs/queue.js');
var s3cmd = require('./libs/s3cmdDockerAPI.js');

// Set AWS Keys for S3
s3cmd.setAWSKeys('key', 'secret');

/**
 * Interval to run
 *
 */
var monitor_interval = 600;
var intervalRunTests;

intervalRunTests = setInterval(function(){

    console.log("run.");

    if(! lockFile.exist() ){
        // No job currently running

        mqContent = mq.poll();

        console.log(mqContent);

        if(mqContent !== null){
            // Found a job in the queue

            async.series([
                    function(callback){
                        // 1) Create lock file

                        lockFile.create();

                        callback(null, 'one');
                    },
                    function(callback){
                        // 2) get data from s3

                        //s3Sync.getData('path to get here the mqContent probably should hold this info');

                        callback(null, 'two');
                    },
                    function(callback){
                        // 3) run BIP pipeline



                        callback(null, 'one');
                    },
                    function(callback){
                        // 4) put results to S3



                        callback(null, 'one');
                    },
                    function(callback){
                        // 5) delete lock file



                        callback(null, 'one');
                    },
                    function(callback){
                        // 6) Notify something that it is done



                        callback(null, 'one');
                    },
                ],
// optional callback
                function(err, results){
                    // results is now equal to ['one', 'two']
                    console.log(results);
                });


        }






    }else{
        // Currently running process

    }

    // Check lock file if this thread is already running a job or not

    // Run job
        // run with async lib

            // 1) Create lock file

            // 2) get data from s3

            // 3) run BIP pipeline

            // 4) put results to S3

            // 5) delete lock file

            // 6) Notify something that it is done


    /*
    shell.exec('curl -s -X POST http://localhost:'+PORT+'/executeMonitorFrisby > /dev/null', function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
    });
    */

}, monitor_interval);


