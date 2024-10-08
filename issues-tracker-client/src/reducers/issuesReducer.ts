import { InitialState } from "../../types"
import { backlogStateFunc, filterForKanban,  backlogDeleteFunc } from "../utils"
import { ActionType } from "../../types"

const ACTIONS = {
  SET_MODAL_STATE: 'set-form-state',
  EDIT_TICKET: 'modal-with-data',
  DELETE_TICKET: 'delete-ticket',
  UPDATE_BACKLOG: 'update-backlog',
  UPDATE_KANBAN_BOARD: 'update-kanban-board'
}

const initialState: InitialState = {
  formState: { TicketId: '', Title: '', Comments: '', DueDate: '', Category: '', Assignee: '', Description: '', TicketStatus: '', IssueType: '' },
  backlogState: { 
    backlog: [], 
    filteredLog: [], 
    selectedTickets:[], 
    filteredView: false, 
    issueTypeFilter: '', 
    menuView: false, 
    filterDropdown: false, 
    deleteView: false,
    numberOfTasksCards: { Todo: '0', Ongoing: '0', Done: '0', Backlog: '0' }
  },
  kanbanBoardState: { Todo: [], Ongoing: [], Done: [] }
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState, kanbanBoardState } = state
  
  switch(action.type) {
    case ACTIONS.DELETE_TICKET:
      return { backlogState: backlogDeleteFunc(action.backlogPayload, backlogState), kanbanBoardState, formState: initialState.formState}
    case ACTIONS.UPDATE_BACKLOG:
      return { 
        backlogState: backlogStateFunc(action.backlogPayload, backlogState), 
        kanbanBoardState, 
        formState: { ...formState }
      }
    case ACTIONS.SET_MODAL_STATE:
      return { backlogState, kanbanBoardState, formState: { ...formState, ...action.ticketPayload } }
    case ACTIONS.EDIT_TICKET:
      return { 
        backlogState: backlogStateFunc(action.backlogPayload, backlogState), 
        kanbanBoardState, 
        formState: { ...action.modalWithDataPayload } }
    case ACTIONS.UPDATE_KANBAN_BOARD:
      return { backlogState, kanbanBoardState: filterForKanban(action.kanbanBoardPayload), formState: { ...formState } }
    default:
      return initialState
  }
}

export {
  ACTIONS,
  issuesReducer,
  initialState
}