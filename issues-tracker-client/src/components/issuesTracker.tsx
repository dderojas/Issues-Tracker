import { useState, useReducer, useEffect } from 'react'
import { useAuthUser } from 'react-auth-kit'
import { VerticalNavbar, Modal, BacklogView, SprintBoardView } from './index';
import { Button } from '../styles';
import { InitialState, Item, SprintBoardState, DeleteTicketType } from '../../types'
import { putItem, scanFunc, updateItem, deleteItem } from '../services';

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
  formState: { Assignee: '', Description: '', PriorityLevel: '', TicketStatus: '', IssueType: '' },
  backlogState: [],
  sprintBoardState: { todo: [], inProgress: [], done: [] }
}

type ActionType = {
  type: string;
  backlogPayload?: Item[];
  ticketPayload?: Item;
  sprintBoardPayload?: Item[];
}


const filterForKanban = (backlogData: Item[] | undefined): SprintBoardState => {
  
  const results: SprintBoardState = { inProgress: [], todo: [], done: [] }

  if (!backlogData || backlogData.length === 0) return results

  for (let i = 0; i < backlogData.length; i++) {
    if (backlogData[i].TicketStatus === 'In Progress') {
      results.inProgress.push(backlogData[i])
    }
    if (backlogData[i].TicketStatus === 'Todo') {
      results.todo.push(backlogData[i])
    }
    if (backlogData[i].TicketStatus === 'Done') {
      results.done.push(backlogData[i])
    }
  }

  return results;
}


const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState, sprintBoardState } = state
  
  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      return { backlogState: [...backlogState ], sprintBoardState, formState: initialState.formState }
    case ACTIONS.DELETE_TICKET:
      return { backlogState: initialState.backlogState, sprintBoardState, formState: initialState.formState}
    case ACTIONS.UPDATE_BACKLOG:
      return { 
        backlogState: action.backlogPayload ? [ ...action.backlogPayload ] : [ ...backlogState ], 
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

const IssuesTracker = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState(false)
  const [inputError, setInputError] = useState('')
  const authUser = useAuthUser()
  
  const [{ backlogState, formState, sprintBoardState }, dispatch] = useReducer(issuesReducer, initialState)
  
  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        console.log(authUser(), 'IN ISSUESTRACKER')
        const items = await scanFunc()
        
        if (items?.length) {
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: items })
          dispatch({ type: ACTIONS.UPDATE_SPRINT_BOARD, sprintBoardPayload: items })
        }
      }
    })()
    
  }, [modalOpen])
  
  const addTicket = ({ Assignee, Description, PriorityLevel, TicketStatus, IssueType }: Item) => {

    if (!Assignee || !Description) {
      
      setInputError('Assignee and Description cannot be empty')

    } else {
      dispatch({ type: ACTIONS.ADD_TICKET })
      
      putItem({
        Assignee,
        Description,
        PriorityLevel,
        TicketStatus,
        IssueType
      })
  
      setModalOpen(false)
    }
  }

  const updateTicket = async ({ Assignee = '', Description = '', PriorityLevel, TicketStatus, IssueType, TicketId }: Item) => {
    if (Assignee.length === 0 || Description.length === 0 || !TicketId || !PriorityLevel || !TicketStatus || !IssueType) {
      setInputError('Assignee and Description cannot be empty')
    } else {
      dispatch({ type: ACTIONS.ADD_TICKET })
      
      await updateItem({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId })
      setModalOpen(false)
    }
  }

  const deleteTicket = async ({ Assignee, TicketId }: DeleteTicketType) => {
    
    dispatch({ type: ACTIONS.DELETE_TICKET })

    await deleteItem(Assignee, TicketId)

    setModalOpen(false)
  }

  const openModalWithData = ({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId }: Item) => {
    setModalOpen(true)
    dispatch({ type: ACTIONS.EDIT_TICKET, ticketPayload: { Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId } })
  }

  return (
    <>
      <VerticalNavbar>
        <Button>Sign In/Register</Button>
        <Button onClick={() => {
          setView(true)
        }}>Backlog</Button>
        <Button onClick={() => {
          setView(false)
        }}>Kanban Board</Button>
        <Button onClick={() => setModalOpen(true)}>Create Ticket</Button>
      </VerticalNavbar>
        { modalOpen && 
          <Modal 
            setModalOpen={setModalOpen} 
            addTicket={addTicket} 
            updateTicket={updateTicket} 
            deleteTicket={deleteTicket} 
            formState={formState} 
            dispatch={dispatch}
            inputError={inputError}
          /> }

      { !view && <SprintBoardView sprintBoardState={sprintBoardState} openModalWithData={openModalWithData}/> }
      { view && <BacklogView list={backlogState} openModalWithData={openModalWithData}/> }
    </>
  );
}

export {
  IssuesTracker,
  ACTIONS
};