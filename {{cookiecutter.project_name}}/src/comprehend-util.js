const AWS = require('aws-sdk');
var comprehend = new AWS.Comprehend();

const getSentiment = function (fileContent) {
    console.log(fileContent)
    // create sentiment parameters
    var comprehendParams = {
        LanguageCode: 'en', /* required */
        Text: fileContent /* required */
    };
    console.log('calling sentiment endpoint')
    return comprehend.detectSentiment(comprehendParams)
        .promise()

}

module.exports = {
    getSentiment: getSentiment
}