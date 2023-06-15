type Key = {
  BookName: string;
}

type Item = {
  BookName: string;
  Author: string;
}

type Ticket = {
  [key:string]: string;
}

type FormState = { issue: string, description: string }

type InitialState = {
  formState: FormState;
  backlogState: Ticket[];
}

type ExpressionAttributeValues = {
  [key: string]: string;
}

type GetParams = {
  TableName: string;
  Key: Key;
}

type DeleteParams = GetParams

type PutParams = {
  TableName: string;
  Item: Item;
}

type UpdateParams = {
  TableName: string;
  Key: Key;
  UpdateExpression: string;
  ExpressionAttributeValues: ExpressionAttributeValues;
  ReturnValues: string;
}

type TemporaryPayloadType = {
  Method: string;
  Payload: GetParams | PutParams | UpdateParams | DeleteParams
}

export type {
  Key,
  Item,
  ExpressionAttributeValues,
  GetParams,
  PutParams,
  UpdateParams,
  DeleteParams,
  TemporaryPayloadType,
  Ticket,
  InitialState,
  FormState
}