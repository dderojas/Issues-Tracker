import { Item } from "./lambdaParamTypes"
import { FormState } from './modalTypes'

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

export type {
  InitialState,
  SprintBoardState,
  BacklogState
}