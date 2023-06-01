const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'BookCatalog',
  Item: {
     BookName: 'MyStory',
     Author: 'Don'
  }
}

module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Successfully created item!';


  try {
    await docClient.put(params).promise();

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

  // return {
  //   statusCode: 200,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     message: responseMessage,
  //   }),
  // }
}