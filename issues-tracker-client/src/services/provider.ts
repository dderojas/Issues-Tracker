import AWS from 'aws-sdk'
import { IssuesPayloadType, Item } from '../../types'

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
  const { 
    Assignee, 
    Description, 
    PriorityLevel,
    Status,
    IssueType
   } = payload
   
  const putParams: IssuesPayloadType = {
    Method: 'Put',
    Payload: {
      TableName : 'Issues',
      //@ts-ignore
      Item: {
         Assignee,
         Description,
         PriorityLevel,
         Status,
         IssueType,
         //@ts-ignore
         'Ticket-Id': Date.now().toString() // TBD string or number
      }

    }
  }

  const params = lambdaParams('HelloWorld', putParams)

  await lambda.invoke(params).promise();
}

const getItem = async () => {
  const getParams: IssuesPayloadType = {
    Method: 'Get',
    Payload: {
      Key: {
        //@ts-ignore
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

  const updateParams: IssuesPayloadType = {
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

const deleteItem = async (Assignee: string) => {
  const deleteParams: IssuesPayloadType = {
    Method: 'Delete',
    Payload: {
      TableName: "Issues",
      Key: {
        Assignee
      },
    }
  }

  const params = lambdaParams('HelloWorld', deleteParams)


  await lambda.invoke(params).promise();
}

const queryFunc = async () => {
  const queryParams: IssuesPayloadType = {
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

  try {
    const lambdaResults = await lambda.invoke(params).promise()

    const something:{
      body: {
        message: string;
        results: {
          Items: Item[]
          Count: number
          ScannedCount: number
        }
      }
      header: string
      statusCode: number
    } = JSON.parse(lambdaResults.Payload!.toString())

    console.log(something, 'inscannnnnnn')
    const { body: { results }, header, statusCode} = something

    return results.Items

  } catch(e) {

  }
}

export {
  deleteItem,
  getItem,
  putItem,
  updateItem,
  queryFunc,
  scanFunc
}
/* 
{
  body: {
    message: string;
    results: {
      Items: Item[]
      Count: number
      ScannedCount: number
    }
  }
  header: string
  statusCode: number
}

*/