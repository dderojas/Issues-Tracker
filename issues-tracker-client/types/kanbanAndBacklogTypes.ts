import { ReactNode } from 'react';
import { Item } from "./lambdaParamTypes"
import { FormState } from './modalTypes'

type BacklogState = { 
  backlog: Item[];
  filteredLog: Item[];
  selectedTickets: string[];
  filteredView: boolean; 
  issueTypeFilter: string;
  menuView: boolean;
  filterDropdown: boolean;
  deleteView: boolean;
}

type KanbanBoardState = {
  [key: string]: ReactNode[]
}

type InitialState = {
  formState: FormState;
  backlogState: BacklogState;
  kanbanBoardState: KanbanBoardState;
}

export type {
  InitialState,
  KanbanBoardState,
  BacklogState
}