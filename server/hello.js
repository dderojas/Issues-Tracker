const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Successfully created item!';


  try {
    if (event.hasOwnProperty('Key')) {

      const results = await docClient.get(event).promise();
      console.log(results, 'results!!!!')

    } else {

      await docClient.put(event).promise();

    }


    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: responseMessage,
      }),
    }
  } catch (err) {
    
    console.log(err)
  }
}