type Key = {
  BookName: string;
}

type Item = {
  BookName: string;
  Author: string;
}

type TicketType = {
  [key:string]: string | number;
}

type FormState = { id: number, issue: string, description: string }

type InitialState = {
  formState: FormState;
  backlogState: TicketType[];
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

type QueryParams = {
  TableName: string;
  IndexName: string;
  KeyConditionExpression?: string;
  ExpressionAttributeValues?: ExpressionAttributeValues;
  Limit: number;
}

type TemporaryPayloadType = {
  Method: string;
  Payload: GetParams | PutParams | UpdateParams | DeleteParams | QueryParams
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
  TicketType,
  InitialState,
  FormState,
  QueryParams
}