import AWS from 'aws-sdk'
import { IssuesPayloadType, TicketType, AccountFormType, FormState } from '../../types'

AWS.config.region = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});
const lambda = new AWS.Lambda()

// typing json stringify payload?
const lambdaParams = (functionName: string, payload: IssuesPayloadType) => {
  return {
    FunctionName: functionName,
    Payload: JSON.stringify(payload)
  }
}

const putItem = async (payload: FormState) => {
  const {
    Email,
    Title,
    DueDate = '',
    Category, 
    Assignee, 
    Description,
    TicketStatus,
    IssueType
  } = payload

  const test = new Date(DueDate)
  const putParams: IssuesPayloadType = {
    Method: 'Put',
    Payload: {
      TableName : 'Issues',
      Item: {
        Email,
        Title,
        //@ts-ignore
        DueDate: test,
        Category,
        Assignee,
        Description,
        TicketStatus,
        IssueType,
        TicketId: Date.now().toString() // TBD string or number
      }

    }
  }

  const params = lambdaParams('HelloWorld', putParams)

  await lambda.invoke(params).promise();
}

// const getItem = async () => {
//   const getParams: IssuesPayloadType = {
//     Method: 'Get',
//     Payload: {
//       TableName: 'Issues' ,
//       Key: {
//         Assignee: 'BadaBing'
//       }
//     }
//    };;

//    const params = lambdaParams('HelloWorld', getParams)


//   await lambda.invoke(params).promise();
// }


const updateItem = async (payload:TicketType) => {
  const {
    Email,
    Title,
    DueDate,
    Category, 
    Assignee, 
    Description,
    TicketStatus,
    IssueType,
    TicketId
   } = payload

   const test = new Date(DueDate)

  const updateParams: IssuesPayloadType = {
    Method: 'Update',
    Payload: {
      TableName: "Issues",
      Key: {
        Email,
        TicketId
      },
      UpdateExpression: "set Title = :title, Assignee = :assignee, DueDate = :dueDate, Category = :category, Description = :description, TicketStatus = :ticketStatus, IssueType = :issueType",
      ExpressionAttributeValues: {
        ":title": Title,
        ":assignee": Assignee,
        //@ts-ignore
        ":dueDate": test.getTime(),
        ":category": Category,
        ":description": Description,
        ":ticketStatus": TicketStatus,
        ":issueType": IssueType
      },
      ReturnValues: "ALL_NEW",
    }
  };

  const params = lambdaParams('HelloWorld', updateParams)


  const results = await lambda.invoke(params).promise()
  // return JSON.parse(results.toString())
}

const deleteItem = async (TicketId?: string) => {
  console.log(TicketId, 'in delete item!')
  const deleteParams: IssuesPayloadType = {
    Method: 'Delete',
    Payload: {
      TableName: "Issues",
      Key: {
        TicketId
      },
    }
  }

  const params = lambdaParams('HelloWorld', deleteParams)


  await lambda.invoke(params).promise();
}

const queryFunc = async (payload: FormState) => {
  const {
    Email
  } = payload

  if (Email) {
    const queryParams: IssuesPayloadType = {
      Method: 'Query',
      Payload: {
        TableName: "Issues",
        KeyConditionExpression: 'Email=:email',
        ExpressionAttributeValues: {
          ':email': Email
        },
        Limit: 10
      }
    }
  
    const params = lambdaParams('HelloWorld', queryParams)
  
    const lambdaResults = await lambda.invoke(params).promise();
  
    const something = JSON.parse(lambdaResults.Payload!.toString())

    return something.body.results.Items
  }
}

// const scanFunc = async () => {
//   const scanParams = {
//     Method: 'Scan',
//     Payload: {
//       TableName: "Issues"
//     }
//   }
// // @ts-ignore
//   const params = lambdaParams('HelloWorld', scanParams)

//   try {
//     const lambdaResults = await lambda.invoke(params).promise()

//     const something:{
//       body: {
//         message: string;
//         results: {
//           Items: Item[]
//           Count: number
//           ScannedCount: number
//         }
//       }
//       header: string
//       statusCode: number
//     } = JSON.parse(lambdaResults.Payload!.toString())

//     console.log(something, 'inscannnnnnn')
//     const { body: { results }, header, statusCode} = something

//     return results.Items

//   } catch(e) {
//     console.error(e)
//   }
// }

const createAccount = async (payload: AccountFormType) => {
  const { Username, Password } = payload
  console.log(payload, 'payload in create account!')
  const putParams: IssuesPayloadType = {
    Method: 'Put',
    Payload: {
      TableName : 'UserAuth',
      Item: { Username, Password }
    }
  }

  const params = lambdaParams('HelloWorld', putParams)

  await lambda.invoke(params).promise();
}

const login = async (payload: AccountFormType) => {
  const { Username, Password } = payload
  console.log(payload, 'payload in login!!')
  const loginParams: IssuesPayloadType = {
    Method: 'Get',
    Payload: {
      TableName: "UserAuth",
      KeyConditionExpression: 'username=:username, password=:password',
      ExpressionAttributeValues: {
        ':username': Username,
        ':password': Password
      }
    }
  }
  
  const params = lambdaParams('HelloWorld', loginParams)

  const results = await lambda.invoke(params).promise();
  const moreResults = JSON.parse(results.Payload!.toString())

  console.log(moreResults, 'results login??')
  return moreResults
}

export {
  deleteItem,
  putItem,
  updateItem,
  queryFunc,
  createAccount,
  login
}