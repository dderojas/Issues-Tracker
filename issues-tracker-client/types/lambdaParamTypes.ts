import { FormState, AccountFormType } from './modalTypes'

type Key = {
  TicketId: string | string[];
  Email: string
}

interface Item extends FormState {
  TicketId: string;
  Email?: string;
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

type BatchDeleteParams = GetParams

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
  KeyConditionExpression: string;
  ExpressionAttributeValues: ExpressionAttributeValues;
  Limit: number;
}

type IssuesPayloadType = {
  Method: string;
  Payload: GetParams | PutParams | UpdateParams | DeleteParams | QueryParams | BatchDeleteParams | LoginParams
}

type DeleteTicketType = {
  TicketId?: string;
  selectedTickets?: string[];
}

type LoginParams = {
  TableName: string;
  KeyConditionExpression: string;
  ExpressionAttributeValues: ExpressionAttributeValues;
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
  DeleteTicketType,
  BatchDeleteParams
}