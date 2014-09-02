var s3cmd = require('../libs/s3cmdDockerAPI.js');

describe("3cmd Docker container controller", function(){

    // A public bucket to test against
    var s3bucketPublic = 's3://garland.public.bucket/s3.functionality.testing';
    var s3bucketUpload = '';

    // Local directory
    var localDir = '/tmp/';

    // Wont work without real keys.  S3cmd/AWS checks keys that are given it to see if it is valid before
    // performing any operations.
    var key = 'foo';
    var secret = 'bar';

    it("Should return true if there is a local Docker server", function(done){

        s3cmd.isThereALocalDockerServer(function(err, result){
            expect(err).toBe(null);
            expect(result).toBe(true);
            done();
        });
    });

    it("Should s3cmd sync a given s3 bucket to a local directory", function(done){

        s3cmd.setAWSKeys(key, secret);

        s3cmd.syncS3ToLocal(localDir, s3bucketPublic, function(err, result){
            expect(err).toBe(null);
            expect(result).toBe(true);
            done();
        });
    });

    /*
    it("Should s3cmd sync a given local directory to s3", function(done){

        s3cmd.setAWSKeys(key, secret);

        s3cmd.syncLocalToS3(localDir, s3bucketUpload, function(err, result){
            expect(err).toBe(null);
            expect(result).toBe(true);
            done();
        });
    });
    */

});