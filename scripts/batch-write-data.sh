#!/bin/sh

# A Simple Shell Script To Batch Write Items Into Two DynamoDb

aws dynamodb batch-write-item --request-items file://resources/request-items-1.json
aws dynamodb batch-write-item --request-items file://resources/request-items-2.json
aws dynamodb batch-write-item --request-items file://resources/request-items-3.json
