#!/bin/sh

INPUT_BASE_PATH=$1
INPUT_DIRECTORY_NAME=$2
OUTPUT_BASE_PATH=$3
PASSWORD_FILE=$4

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
tar -cz ${INPUT_DIRECTORY_NAME} | openssl enc -e -aes-256-cbc -salt -out ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz.dat -pass file:${PASSWORD_FILE}


#
# Two step process.  tar/gz to folder to a file.  Then encrypt that tar ball.
#
# Tar and gzip folder
#tar -zcvf ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz ${INPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}

# Encrypt tar.gz file
#openssl enc -e -aes-256-cbc -salt -in ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz -out ${OUTPUT_BASE_PATH}/${INPUT_DIRECTORY_NAME}.tar.gz.bin -pass file:password.txt