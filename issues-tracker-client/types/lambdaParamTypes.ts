import { FormState, AccountFormType } from './modalTypes'
import { BacklogState } from './kanbanAndBacklogTypes'

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
  QueryParams,
  DispatchType,
  DeleteTicketType
}