require('dotenv').config();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const docClient = new AWS.DynamoDB.DocumentClient();
const jwtSecret = process.env.JWT_SECRET

type Item = {
  Email: string;
  Username?: string;
  Password?: string;
  Title?: string;
  Comments?: string;
  DueDate?: string;
  Category?: string;
  Assignee?: string;
  Description?: string;
  TicketStatus?: string;
  IssueType?: string;
}

type HandlerResponseType = {
  statusCode: number;
  headers: {
    [x:string]: string;
  };
  body: {
    message: string;
    results: { Items: Item[] };
    jwtToken?: string;
  }
}

module.exports.handler = async (event) => {
  console.log('Event: ', event);

  let response: HandlerResponseType = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      message: 'Successfully created item!',
      results: { Items: [] }
    },
  }

  try {
    if (event.Payload.TableName === 'UserAuth') {
      if (event.Method === 'Put') {
        const { TableName, Item } = event.Payload
        const { Username, Password } = Item

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(Password, salt)
        const newPayload = { TableName, Item: { Username, Password: hashPassword } }

        response.body.results = await docClient.put(newPayload).promise();
      }

      if (event.Method === 'Get') {
        console.log('Authorize User:', event)
        
        const { Payload } = event
        const payloadPassword = Payload.ExpressionAttributeValues[':password']

        const newPayload = {
          TableName: 'UserAuth',
          KeyConditionExpression: 'Username=:username',
          ExpressionAttributeValues: { 
            ':username': Payload.ExpressionAttributeValues[':username'] 
          }
        }

        let userResults = await docClient.query(newPayload).promise()
        let username = userResults.Items[0].Username;
        let hashPassword = userResults.Items[0].Password;

        const passwordCheck = await bcrypt.compare(payloadPassword, hashPassword)

        if (passwordCheck) {

          let jwtToken: string = jwt.sign({ username, hashPassword }, jwtSecret)
          response.body.jwtToken = jwtToken
          response.body.results = userResults

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
        response.body.results = await docClient.scan(event.Payload).promise()
      }
  
      if (event.Method === 'Query') {
        response.body.results = await docClient.query(event.Payload).promise()
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
          
          await Promise.all(deletePromises);
          response.body.message = 'Successfully deleted items!'

        } else {

          response.body.results = await docClient.delete(event.Payload).promise();

        }

  
      } else if (event?.Method === 'Put') {
  
        response.body.results = await docClient.put(event.Payload).promise();
  
      } else if (event?.Method === 'Update') {
  
        response.body.results = await docClient.update(event.Payload).promise();
  
      } else if (event?.Method === 'Get') {
  
        response.body.results = await docClient.get(event.Payload).promise();
  
      }
    }
    

    console.log('DB results!!:', response.body.results)

    return response
  } catch (err) {
    
    console.log(err)
  }
}