
import AWS from 'aws-sdk'
import { useState, useReducer } from 'react'
import { TemporaryPayloadType } from '../types'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button } from './styles';
import { Modal } from './components';


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

type ActionType = {
  type?: string;
  payload: { item: string }
}

const reducerSomething = (state: string[], action: ActionType) => {
  return [...state, action.payload.item]
}

const App = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [showBacklog, setBacklog] = useState<boolean>(false)

  const [state, dispatch] = useReducer(reducerSomething, [])

console.log(showBacklog, 'state!!!')
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

    await lambda.invoke(params).promise();
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


    await lambda.invoke(params).promise();
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


    await lambda.invoke(params).promise();
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


    await lambda.invoke(params).promise();
  }

  const addTicket = () => {
    dispatch({ payload: { item: 'heloooooo' } })
  }

  return (
    <div>
      <header>
        <HorizontalNavbar>
          <Button onClick={() => putItem()}>put item</Button>
          <Button onClick={() => getItem()}>Sign In/Register</Button>
        </HorizontalNavbar>
      </header>
      {modalOpen && <Modal addTicket={addTicket} setOpenModal={setModalOpen}/>}
      <div style={{ display: 'flex' }}>
        <VerticalNavbar>
          <Button onClick={() => {
            setBacklog(!showBacklog)
          }}>Backlog</Button>
          <Button onClick={() => deleteItem()}>delete item</Button>
          <Button onClick={() => setModalOpen(true)}>Create Ticket</Button>
        </VerticalNavbar>
        { showBacklog && <BacklogView list={state}/> }
      </div>
    </div>
  );
}

export default App;
