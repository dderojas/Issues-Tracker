import { BacklogState } from './kanbanAndBacklogTypes'
import { Item } from './lambdaParamTypes'

type ActionType = {
  type: string;
  backlogPayload?: BacklogState;
  ticketPayload?: Item;
  sprintBoardPayload: { items?: Item[],   openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void; };
}

export type {
  ActionType
}