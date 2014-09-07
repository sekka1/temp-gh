#!/bin/sh

INPUT_BASE_PATH=$1
INPUT_DIRECTORY_NAME=$2
OUTPUT_BASE_PATH=$3
PUBLIC_KEY=$4

echo $INPUT_BASE_PATH
echo $INPUT_DIRECTORY_NAME
echo $OUTPUT_BASE_PATH
echo $PASSWORD_FILE

#
# One step
#
# Tar/gz and pipe into openssl to output to an encrypted file
#
cd ${INPUT_BASE_PATH}
tar -cz ${INPUT_DIRECTORY_NAME} | openssl smime -encrypt -aes256 -binary -outform DEM -out ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz.dat ${PUBLIC_KEY}

#openssl rsautl -encrypt -inkey ${PUBLIC_KEY} -pubin -out ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz.dat

#
# Two step process.  tar/gz to folder to a file.  Then encrypt that tar ball.
#
# Tar and gzip folder
#tar -zcvf ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz ${INPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}

# Encrypt tar.gz file
#openssl enc -e -aes-256-cbc -salt -in ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz -out ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz.bin -pass file:password.txt