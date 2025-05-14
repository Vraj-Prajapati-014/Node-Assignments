//This is what i written in AWS Lambda function to log metadata of uploaded files to DynamoDB

import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';

const dynamoDBClient = new DynamoDBClient({ region: 'eu-north-1' });
const s3Client = new S3Client({ region: 'eu-north-1' });

const validateMetadata = (metadata) => {
    if (typeof metadata.fileName !== 'string' || !metadata.fileName) {
        throw new Error('fileName must be a non-empty string');
    }
    if (typeof metadata.fileSize !== 'number' || metadata.fileSize < 0) {
        throw new Error('fileSize must be a non-negative number');
    }
    if (typeof metadata.fileType !== 'string' || !metadata.fileType) {
        throw new Error('fileType must be a non-empty string');
    }
    if (typeof metadata.uploadTime !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(metadata.uploadTime)) {
        throw new Error('uploadTime must be a valid ISO 8601 timestamp');
    }
};

export const handler = async (event) => {
    try {
        console.log('S3 Event:', JSON.stringify(event, null, 2)); // Debug log

        const s3Event = event.Records[0].s3;
        const bucketName = s3Event.bucket.name;
        const fileName = decodeURIComponent(s3Event.object.key.replace(/\+/g, ' '));
        const uploadTime = event.Records[0].eventTime;

        const headObjectParams = {
            Bucket: bucketName,
            Key: fileName,
        };
        const headObjectCommand = new HeadObjectCommand(headObjectParams);
        const headObjectResponse = await s3Client.send(headObjectCommand);
        console.log('HeadObject Response:', headObjectResponse); // Debug log

        const fileSize = headObjectResponse.ContentLength;
        const fileType = headObjectResponse.ContentType || 'application/octet-stream';

        const metadata = { fileName, fileSize, fileType, uploadTime };
        validateMetadata(metadata);

        const dynamoParams = {
            TableName: 'FileMetadata',
            Item: {
                fileName: { S: fileName },
                fileSize: { N: fileSize.toString() },
                fileType: { S: fileType },
                uploadTime: { S: uploadTime },
            },
        };
        const putItemCommand = new PutItemCommand(dynamoParams);
        await dynamoDBClient.send(putItemCommand);

        console.log(`Successfully logged metadata for ${fileName}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Metadata logged successfully' }),
        };
    } catch (error) {
        console.error('Error processing S3 event:', error);
        throw new Error('Failed to process S3 event');
    }
};