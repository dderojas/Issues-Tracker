type Key = {
  TicketId?: string;
  Assignee?: string
}

interface Item extends FormState {
  TicketId?: string;
}

type DispatchType = {
  type: string;
  backlogPayload?: Item[];
  sprintBoardPayload?: Item[];
  ticketPayload?: Item;
}

type TicketType = {
  [key:string]: string;
}
// clarify why they are all tentative properties
type FormState = {
  Assignee?: string;
  Description?: string;
  PriorityLevel?: string;
  TicketStatus?: string;
  IssueType?: string;
}

type SprintBoardState = { 
  todo: Item[], 
  inProgress: Item[], 
  done: Item[] 
}

type InitialState = {
  formState: FormState;
  backlogState: Item[];
  sprintBoardState: SprintBoardState;
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
  Item: Item | AccountFormType;
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
  IndexName?: string;
  KeyConditionExpression?: string;
  ExpressionAttributeValues?: ExpressionAttributeValues;
  Limit?: number;
}

type IssuesPayloadType = {
  Method: string;
  Payload: GetParams | PutParams | UpdateParams | DeleteParams | QueryParams
}

type AccountFormType = {
  Username: string;
  Password: string;
}

type DeleteTicketType = {
  Assignee: string;
  TicketId: string;
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
  QueryParams, 
  AccountFormType,
  SprintBoardState,
  DispatchType,
  DeleteTicketType
}