import './App.css';
import { useState, useEffect } from 'react'
import AWS from 'aws-sdk'

AWS.config.region = "us-west-2";
const lambda = new AWS.Lambda()
console.log(process.env, 'envvvvvv')

const App = () => {
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
    </div>
  );
}

export default App;
