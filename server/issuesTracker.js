require('dotenv').config();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const docClient = new AWS.DynamoDB.DocumentClient();
const jwtSecret = process.env.JWT_SECRET


module.exports.handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Successfully created item!';
  let results
  let jwtToken

  try {
    if (event.Payload.TableName === 'UserAuth') {
      if (event.Method === 'Put') {
        const { TableName, Item } = event.Payload
        const { Username, Password } = Item

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(Password, salt)
        const newPayload = { TableName, Item: { Username, Password: hashPassword } }

        results = await docClient.put(newPayload).promise();
      }

      if (event.Method === 'Get') {
        console.log('in Get event:', event)
        
        const { Payload } = event
        const payloadPassword = Payload.ExpressionAttributeValues[':password']

        const newPayload = {
          TableName: 'UserAuth',
          KeyConditionExpression: 'Username=:username',
          ExpressionAttributeValues: { 
            ':username': Payload.ExpressionAttributeValues[':username'] 
          }
        }

        results = await docClient.query(newPayload).promise()
        let username = results.Items[0].Username;
        let hashPassword = results.Items[0].Password;

        const passwordCheck = await bcrypt.compare(payloadPassword, hashPassword)

        if (passwordCheck) {
          jwtToken = jwt.sign({ username, hashPassword }, jwtSecret)

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
        
        if (Array.isArray(event.Payload.Key.TicketId)) {
          
          const deletePromises = event.Payload.Key.TicketId.map((item) => {

            const params = {
              TableName: event.Payload.TableName,
              Key: {
                Email: event.Payload.Key.Email,
                TicketId: item
              }
            };

            return docClient.delete(params).promise();
          });
          
          results = await Promise.all(deletePromises);

        } else {

          results = await docClient.delete(event.Payload).promise();

        }

  
      } else if (event?.Method === 'Put') {
  
        results = await docClient.put(event.Payload).promise();
  
      } else if (event?.Method === 'Update') {
  
        results = await docClient.update(event.Payload).promise();
  
      } else if (event?.Method === 'Get') {
  
        results = await docClient.get(event.Payload).promise();
  
      }
    }
    

    console.log('DB results!!:',results)

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