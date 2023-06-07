
import AWS from 'aws-sdk'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TemporaryPayloadType } from '../types'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'

const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: 1px solid green;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
`

AWS.config.region = "us-west-2";
// will hide future keys, this is testing
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIA5DJRWA3LPGOJR46H',
  secretAccessKey: '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',
});
const lambda = new AWS.Lambda()

// typing json stringify payload?
const lambdaParams = (functionName: string, payload: any) => {
    return {
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    }
}

const App = () => {
  
  const putItem = async () => {
    const putParams: TemporaryPayloadType = {
      Method: 'Put',
      Payload: {
        TableName : 'BookCatalog',
        Item: {
           BookName: 'BadaBing',
           Author: 'Don'
        }

      }
    }

    const params = lambdaParams('HelloWorld', putParams)

    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  const getItem = async () => {
    const getParams: TemporaryPayloadType = {
      Method: 'Get',
      Payload: {
        Key: {
          "BookName": 'BadaBing'
         }, 
         TableName: "BookCatalog" 
      }
     };;

     const params = lambdaParams('HelloWorld', getParams)


    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  const updateItem = async () => {
    const updateParams: TemporaryPayloadType = {
      Method: 'Update',
      Payload: {
        TableName: "BookCatalog",
        Key: {
          BookName: "BadaBing",
        },
        UpdateExpression: "set Author = :author",
        ExpressionAttributeValues: {
          ":author": "SteveHEHE",
        },
        ReturnValues: "ALL_NEW",
      }
    };;

    const params = lambdaParams('HelloWorld', updateParams)


    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  const deleteItem = async () => {
    const deleteParams: TemporaryPayloadType = {
      Method: 'Delete',
      Payload: {
        TableName: "BookCatalog",
        Key: {
          BookName: "BadaBing",
        },
      }
    }

    const params = lambdaParams('HelloWorld', deleteParams)


    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  return (
    <div className="App">
      <HorizontalNavbar>
        <Button onClick={() => putItem()}>put item</Button>
        <Button onClick={() => getItem()}>get item</Button>
      </HorizontalNavbar>
      <VerticalNavbar>
        <Button onClick={() => updateItem()}>update item</Button>
        <Button onClick={() => deleteItem()}>delete item</Button>
      </VerticalNavbar>
    </div>
  );
}

export default App;
