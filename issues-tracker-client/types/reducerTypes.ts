import { BacklogState } from './kanbanAndBacklogTypes'
import { Item } from './lambdaParamTypes'

type KanbanBoardPayload = { 
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
  kanbanBoardPayload?: KanbanBoardPayload
}

export type {
  ActionType,
  KanbanBoardPayload
}