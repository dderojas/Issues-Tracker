import AWS from 'aws-sdk'
import { TemporaryPayloadType } from '../../types'

AWS.config.region = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});
const lambda = new AWS.Lambda()


// typing json stringify payload?
const lambdaParams = (functionName: string, payload: any) => {
  return {
    FunctionName: functionName,
    Payload: JSON.stringify(payload)
  }
}

//@ts-ignore
const putItem = async (payload) => {
  const { issue, description, priorityLevel
   } = payload

  const putParams: TemporaryPayloadType = {
    Method: 'Put',
    Payload: {
      TableName : 'Issues',
      Item: {
         Issue: issue,
         Description: description,
         PriorityLevel: priorityLevel
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

// @ts-ignore
const updateItem = async (payload) => {
  const { issue, description, priorityLevel
  } = payload

  const updateParams: TemporaryPayloadType = {
    Method: 'Update',
    Payload: {
      TableName: "Issues",
      Key: {
        // @ts-ignore
        Issue: issue
      },
      UpdateExpression: "set PriorityLevel = :priority, Description = :description",
      ExpressionAttributeValues: {
        ":priority": priorityLevel,
        ":description": description
      },
      ReturnValues: "ALL_NEW",
    }
  };;

  const params = lambdaParams('HelloWorld', updateParams)


  const results = await lambda.invoke(params).promise();
  // @ts-ignore
  console.log(JSON.parse(results), 'INUPDATE!@!#@')
}

const deleteItem = async (Issue: string) => {
  const deleteParams: TemporaryPayloadType = {
    Method: 'Delete',
    Payload: {
      TableName: "Issues",
      Key: {
        //@ts-ignore
        Issue: Issue,
      },
    }
  }

  const params = lambdaParams('HelloWorld', deleteParams)


  await lambda.invoke(params).promise();
}

const queryFunc = async () => {
  const queryParams: TemporaryPayloadType = {
    Method: 'Query',
    Payload: {
      TableName: "Issues",
      IndexName: 'Author-Index',
      KeyConditionExpression: 'Author=:author',
      ExpressionAttributeValues: {
        ':author': 'morning!'
      },
      Limit: 5
    }
  }

  const params = lambdaParams('HelloWorld', queryParams)

  const { Payload } = await lambda.invoke(params).promise();
  // @ts-ignore
  const something = JSON.parse(Payload)
  console.log(something.body.results)

}

const scanFunc = async () => {
  const scanParams = {
    Method: 'Scan',
    Payload: {
      TableName: "Issues"
    }
  }

  const params = lambdaParams('HelloWorld', scanParams)
  const { Payload } = await lambda.invoke(params).promise();
  // @ts-ignore
  const something = JSON.parse(Payload)
  console.log(something.body.results, 'bodyyyyyy')
  return something.body.results
}

export {
  deleteItem,
  getItem,
  putItem,
  updateItem,
  queryFunc,
  scanFunc
}
