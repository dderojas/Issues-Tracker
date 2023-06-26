import AWS from 'aws-sdk'
import { TemporaryPayloadType } from '../../types'

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

//@ts-ignore
const putItem = async (payload) => {
  const { issue, description } = payload

  const putParams: TemporaryPayloadType = {
    Method: 'Put',
    Payload: {
      TableName : 'BookCatalog',
      Item: {
         BookName: issue,
         Author: description
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

const queryFunc = async () => {
  const queryParams: TemporaryPayloadType = {
    Method: 'Query',
    Payload: {
      TableName: "BookCatalog",
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
      TableName: "BookCatalog"
    }
  }

  const params = lambdaParams('HelloWorld', scanParams)
  const something = await lambda.invoke(params).promise();
  console.log(something, 'eyyyyyyy')
}

export {
  deleteItem,
  getItem,
  putItem,
  updateItem,
  queryFunc,
  scanFunc
}
