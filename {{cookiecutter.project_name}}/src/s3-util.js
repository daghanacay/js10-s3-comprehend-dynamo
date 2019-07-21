const aws = require('aws-sdk')
const fs = require('fs')
const s3 = new aws.S3()
const downloadFileFromS3 = function (bucket, fileKey, filePath) {
    'use strict';
    console.log('downloading', bucket, fileKey, filePath);
    return new Promise(function (resolve, reject) {
        const file = fs.createWriteStream(filePath),
            stream = s3.getObject({
                Bucket: bucket,
                Key: fileKey
            }).createReadStream();
        stream.on('error', reject);
        file.on('error', reject);
        file.on('finish', function () {
            console.log('downloaded', bucket, fileKey);
            resolve(filePath);
        });
        stream.pipe(file);
    });
}
const readFileFromS3 = function (bucket, fileKey) {
    'use strict';
    console.log('reading', bucket, fileKey);
    return s3.getObject({
        Bucket: bucket,
        Key: fileKey
    })
    .promise()
    .then(fileContent=>fileContent.Body.toString());
}

const uploadFileToS3 = function (bucket, fileKey, filePath) {
    'use strict';
    console.log('uploading', bucket, fileKey, filePath);
    return s3.upload({
        Bucket: bucket,
        Key: fileKey,
        Body: fs.createReadStream(filePath),
        ACL: 'private'
    }).promise();
};

module.exports = {
    downloadFileFromS3: downloadFileFromS3,
    readFileFromS3: readFileFromS3,
    uploadFileToS3: uploadFileToS3
};