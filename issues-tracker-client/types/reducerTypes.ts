import { Item } from './lambdaParamTypes'
import { FormState } from './modalTypes';

type KanbanBoardPayload = { 
  items: Item[], 
  openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void;
}

type BacklogPayload = { 
  backlog?: Item[];
  filteredLog?: Item[];
  selectedTickets?: string[];
  filteredView?: boolean; 
  issueTypeFilter?: string;
  menuView?: boolean;
  filterDropdown?: boolean;
  deleteView?: boolean;
}

type ActionType = {
  type: string;
  backlogPayload?: BacklogPayload;
  ticketPayload?: FormState;
  kanbanBoardPayload?: KanbanBoardPayload;
  modalWithDataPayload?: Item;
}

export type {
  ActionType,
  KanbanBoardPayload,
  BacklogPayload
}