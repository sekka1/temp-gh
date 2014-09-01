/**
 * Checks if there is a lock file.  This would indicate that this working is
 * already running a job.
 */

var lockFile = '/tmp/worker.lock';

exports.exist = function(){

    // Check if the lock file exists

    // returns true or false
    return false;

};

exports.create = function(){

    // Create the lock file

    return true;
};

exports.delete = function(){

    // Delete the lock file

    return true;
};