import { BacklogState } from './kanbanAndBacklogTypes'
import { Item } from './lambdaParamTypes'

type ActionType = {
  type: string;
  backlogPayload?: BacklogState;
  ticketPayload?: Item;
  sprintBoardPayload?: Item[];
}

export type {
  ActionType
}