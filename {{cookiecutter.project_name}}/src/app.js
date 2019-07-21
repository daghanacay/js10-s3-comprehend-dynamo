const s3Util = require('./s3-util');
const comprehendUtil = require('./comprehend-util');
const dynamoUtil = require('./dynamo-util');
const TABLE_NAME = process.env.TABLE_NAME;


exports.lambdaHandler = (eventObject, context) => {
  const eventRecord = eventObject.Records && eventObject.Records[0],
    inputBucket = eventRecord.s3.bucket.name,
    key = eventRecord.s3.object.key


  return s3Util.readFileFromS3(inputBucket, key)
    .then(fileContent => comprehendUtil.getSentiment(fileContent))
    .then(sentimentData => dynamoUtil.writeToDynamoDb(TABLE_NAME, key, sentimentData))
    .then(response => response)
    .catch(err => {
      console.log(err);
      return err;
    });
};
