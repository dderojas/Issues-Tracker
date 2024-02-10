import { BacklogState } from './kanbanAndBacklogTypes'
import { Item } from './lambdaParamTypes'

type SprintBoardPayload = { 
  items?: Item[], 
  openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void;
}

type ActionType = {
  type: string;
  backlogPayload?: BacklogState;
  ticketPayload?: Item;
  sprintBoardPayload?: SprintBoardPayload
}

export type {
  ActionType,
  SprintBoardPayload
}