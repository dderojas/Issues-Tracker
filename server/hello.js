const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Successfully created item!';
  let results
  
  try {
    if (event.Method === 'Scan') {
      results = await docClient.scan(event.Payload).promise()
    }

    if (event.Method === 'Query') {
      results = await docClient.query(event.Payload).promise()
    }

    if (event?.Method === 'Delete') {

      results = await docClient.delete(event.Payload).promise();

    } else if (event?.Method === 'Put') {

      results = await docClient.put(event.Payload).promise();

    } else if (event?.Method === 'Update') {

      results = await docClient.update(event.Payload).promise();

    } else if (event?.Method === 'Get') {

      results = await docClient.get(event.Payload).promise();

    }

    console.log(results, 'DB results!!')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        message: responseMessage,
        results
      },
    }
  } catch (err) {
    
    console.log(err)
  }
}