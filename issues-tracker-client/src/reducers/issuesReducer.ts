import { InitialState } from "../../types"
import { backlogStateFunc, filterForKanban } from "../utils"
import { ActionType } from "../../types"

const ACTIONS = {
  ADD_TICKET: 'add-ticket',
  SET_MODAL_STATE: 'set-form-state',
  EDIT_TICKET: 'modal-with-data',
  UPDATE_TICKET: 'update-ticket',
  DELETE_TICKET: 'delete-ticket',
  UPDATE_BACKLOG: 'update-backlog',
  UPDATE_SPRINT_BOARD: 'update-sprint-board'
}

const initialState: InitialState = {
  formState: { Title: '', Comments: '', DueDate: '', Category: '', Assignee: '', Description: '', TicketStatus: '', IssueType: '' },
  backlogState: { backlog: [], filteredLog: [], filteredView: false, issueTypeFilter: '' },
  sprintBoardState: { Todo: [], Ongoing: [], Done: [] }
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState, sprintBoardState } = state

  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      return { backlogState: { ...backlogState }, sprintBoardState, formState: initialState.formState }
    case ACTIONS.DELETE_TICKET:
      return { backlogState: initialState.backlogState, sprintBoardState, formState: initialState.formState}
    case ACTIONS.UPDATE_BACKLOG:
      return { 
        backlogState: backlogStateFunc(action.backlogPayload, backlogState), 
        sprintBoardState, 
        formState: initialState.formState
      }
    case ACTIONS.SET_MODAL_STATE:
      return { backlogState, sprintBoardState, formState: { ...formState, ...action.ticketPayload } }
    case ACTIONS.EDIT_TICKET:
      return { backlogState, sprintBoardState, formState: { ...formState, ...action.ticketPayload } }
    case ACTIONS.UPDATE_SPRINT_BOARD:
      return { backlogState, sprintBoardState: filterForKanban(action.sprintBoardPayload), formState: initialState.formState }
    default:
      return initialState
  }
}

export {
  ACTIONS,
  issuesReducer,
  initialState
}