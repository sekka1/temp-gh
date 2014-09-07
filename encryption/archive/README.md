Encrypting Archive Data
========================

A set of script to encrypt a set of directories for archival

1. tar and gzip a folder
1. encrypt it
 
 
 
 
Password
==========

1. Create password file with the some arbitrary long password

1. Run password encrypt script

          ./password/tar-gz-encrypt-directory.sh <INPUT_BASE_PATH> <INPUT_DIRECTORY> <OUTPUT_BASE_PATH> <PASSWORD_FILE>


RSA Keys
==========

Doesnt work

1. Generate keys

         openssl genrsa -out private_key.pem 2048
     
1. Generate pulic key from the private key

         openssl rsa -in private_key.pem -out public_key.pem -outform PEM -pubout
     
1. Encrypt

         openssl rsautl -encrypt -inkey public_key.pem -pubin -in encrypt.tar.gz -out encrypt.tar.gz.dat 
         
2. Decrypt

         openssl rsautl -decrypt -inkey private_key.pem -in encrypt.tar.gz.dat -out new_encrypt.tar.gz
         
         