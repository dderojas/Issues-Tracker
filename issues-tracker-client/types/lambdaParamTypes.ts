type Key = {
  TicketId?: string;
  Assignee?: string
}

interface Item extends FormState {
  TicketId?: string;
}

type TicketType = {
  [key:string]: string;
}

type FormState = {
  Assignee: string;
  Description: string;
  PriorityLevel: string;
  TicketStatus: string;
  IssueType: string;
}

type InitialState = {
  formState: FormState;
  backlogState: Item[];
  sprintBoardState: any;
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

type IssuesPayloadType = {
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
  IssuesPayloadType,
  TicketType,
  InitialState,
  FormState,
  QueryParams
}