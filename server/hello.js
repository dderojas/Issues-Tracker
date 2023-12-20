const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
const docClient = new AWS.DynamoDB.DocumentClient();
const jwtSecret = `17ceb96484aadfb728a760dd099de
cf2b90ae3c34018d381024af58718d
bc00cc18cf8d01af37ac0a81697390
fb4fd26110b15fffb484bf87bf7736
4349c10d9`


module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Successfully created item!';
  let results
  let jwtToken
  try {
    if (event.Payload.TableName === 'UserAuth') {
      if (event.Method === 'Put') {
        //dfasdfasd
        results = await docClient.put(event.Payload).promise();
      }

      if (event.Method === 'Get') {
        //dfasdfasd
        console.log('in get!!', event)
        const { Payload } = event
        const oldPassword = Payload.ExpressionAttributeValues[':password']

        const newPayload = {
          TableName: 'UserAuth',
          KeyConditionExpression: 'Username=:username',
          ExpressionAttributeValues: { 
            ':username': Payload.ExpressionAttributeValues[':username'] 
          }
        }

        results = await docClient.query(newPayload).promise()
        let username = results.Items[0].Username;
        let password = results.Items[0].Password;

        if (oldPassword === password) {

          jwtToken = jwt.sign({ username, password }, jwtSecret)

        } else {
          return {
            statusCode: 401,
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              message: 'can not find user',
              results: []
            },
          }
        }

      }
    }

    if (event.Payload.TableName === 'Issues') {
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
    }
    

    console.log(results, 'DB results!!')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        message: responseMessage,
        results,
        jwtToken
      },
    }
  } catch (err) {
    
    console.log(err)
  }
}