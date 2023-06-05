import './App.css';
import { useState, useEffect } from 'react'
import AWS from 'aws-sdk'

AWS.config.region = "us-west-2";
// will hide future keys, this is testing
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIA5DJRWA3LPGOJR46H',
  secretAccessKey: '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',
});
const lambda = new AWS.Lambda()


const App = () => {
  
  const putItem = async () => {
    const putParams = {
      TableName : 'BookCatalog',
      Item: {
         BookName: 'BadaBing',
         Author: 'Don'
      }
    }

    const params = {
      FunctionName: 'HelloWorld',
      Payload: JSON.stringify(putParams)
    };

    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  const getItem = async () => {
    const getParams = {
      Key: {
       "BookName": 'BadaBing', // can only make get call with BookName attribute?
      //  "Author": 'Don'
      }, 
      TableName: "BookCatalog"
     };;

    const params = {
      FunctionName: 'HelloWorld',
      Payload: JSON.stringify(getParams)
    };

    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  const updateItem = async () => {
    const updateParams = {
      TableName: "BookCatalog",
      Key: {
        BookName: "BadaBing",
      },
      UpdateExpression: "set Author = :author",
      ExpressionAttributeValues: {
        ":author": "SteveHEHE",
      },
      ReturnValues: "ALL_NEW",
    };;

    const params = {
      FunctionName: 'HelloWorld',
      Payload: JSON.stringify(updateParams)
    };

    const result = await lambda.invoke(params).promise();
    console.log(result, 'resultssssss')
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        hellooooooooooo
      </div>
      <button onClick={() => putItem()}>put item</button>
      <button onClick={() => getItem()}>get item</button>
      <button onClick={() => updateItem()}>get item</button>
    </div>
  );
}

export default App;
