var lockFile = require('../libs/lockFile.js');
var shelljs = require('shelljs');

describe("Lock file handling", function(){

    var lockFileLocation = '/tmp/worker.lock';

/*
    beforeEach(function(done) {

    });

    afterEach(function(done) {

    });
    */

    it("Should return false if the lock file does not exist", function(){

        var result = lockFile.exist();
        expect(result).toBe(false);
    });
    it("Should return true if the lock file exist", function(){

        var result = lockFile.exist();
        expect(result).toBe(true);
    });

    it("Should create a lock file", function(){

        var result = lockFile.create();
        expect(result).toBe(true);

        // Check if lock file is on the file system
        if(shelljs.test('-e', lockFileLocation)){
            // file exist
        }else{
            // file does not exist
        }
    });

    it("Should delete a lock file", function(){

        var result = lockFile.delete();
        expect(result).toBe(true);

        // Check if the lock file is not on the file system
        if(shelljs.test('-e', lockFileLocation)){
            // file exist
        }else{
            // file does not exist
        }
    });


});