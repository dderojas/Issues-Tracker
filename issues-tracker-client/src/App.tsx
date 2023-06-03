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

  const myFunc = async () => {
    const params = {
      FunctionName: 'HelloWorld'
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
      <button onClick={() => myFunc()}>click meeeeee</button>
    </div>
  );
}

export default App;
