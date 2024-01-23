type Key = {
  TicketId?: string;
  Email?: string
}

interface Item extends FormState {
  TicketId?: string;
}

type DispatchType = {
  type: string;
  backlogPayload?: BacklogState;
  sprintBoardPayload?: Item[];
  ticketPayload?: Item;
}

type TicketType = {
  [key:string]: string;
}

type FormState = {
  Email?: string;
  Title?: string;
  Comments?: string;
  DueDate?: string;
  Category?: string;
  Assignee?: string;
  Description?: string;
  TicketStatus?: string;
  IssueType?: string;
}

type BacklogState = { 
  backlog?: Item[];
  filteredLog?: Item[]; 
  filteredView?: boolean; 
  issueTypeFilter?: string; 
}

type SprintBoardState = { 
  todo: Item[], 
  inProgress: Item[], 
  done: Item[] 
}

type InitialState = {
  formState: FormState;
  backlogState: BacklogState;
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
  BacklogState,
  DispatchType,
  DeleteTicketType
}