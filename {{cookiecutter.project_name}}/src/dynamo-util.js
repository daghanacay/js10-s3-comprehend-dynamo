const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const writeToDynamoDb = function (TABLE_NAME, rangeValue, sentiment) {
    // create dynamo parameters
    const HASHKEY_KEY = `${TABLE_NAME}_hash`;
    const RANGE_KEY = `${TABLE_NAME}_range`;
    var data = []
    data[HASHKEY_KEY] = new Date().toISOString().split('T')[0]
    data[RANGE_KEY] = rangeValue
    data['SENTIMENT'] = sentiment.Sentiment

    var dynamoParams = {
        TableName: TABLE_NAME,
        Item: data
    };
    console.log('calling dynamo endpoint')
    return docClient.put(dynamoParams).promise()
}

module.exports = {
    writeToDynamoDb: writeToDynamoDb
}