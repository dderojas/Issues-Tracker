import { useState, useReducer, useEffect } from 'react'
import { HorizontalNavbar, VerticalNavbar, Modal, BacklogView, SprintBoardView } from './components';
import { Button } from './styles';
import { InitialState, Item } from '../types'
import { putItem, scanFunc, updateItem, deleteItem } from './services';

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
  sprintBoardPayload?: any;
}


const filterForKanban = (backlogData:any) => {

  const inProgress:any = []

  const todo:any = []

  const done:any = []

  const results:any = { inProgress, todo, done }

  for (let i = 0; i < backlogData.length; i++) {
    if (backlogData[i].TicketStatus === 'inProgress') {
      results.inProgress.push(backlogData[i])
    }
    if (backlogData[i].TicketStatus === 'todo') {
      results.todo.push(backlogData[i])
    }
    if (backlogData[i].TicketStatus === 'done') {
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

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState(false)

  const [{ backlogState, formState, sprintBoardState }, dispatch] = useReducer(issuesReducer, initialState)

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        const items = await scanFunc()

        if (items?.length) {
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: items })
          dispatch({ type: ACTIONS.UPDATE_SPRINT_BOARD, sprintBoardPayload: items })
        }
      }
    })()

  }, [modalOpen])

  // add type for "e", maybe React.FormEvent<HTMLInputElement>
  const addTicket = (e: any) => {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TICKET })

    putItem({
      [e.target[0].name]: e.target[0].value,
      [e.target[1].name]: e.target[1].value,
      [e.target[2].name]: e.target[2].value,
      [e.target[3].name]: e.target[3].value,
      [e.target[4].name]: e.target[4].value
    })
  }

  const updateTicket = async ({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId = '' }: Item) => {
    dispatch({ type: ACTIONS.ADD_TICKET })


    await updateItem({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId })
  }

  const deleteTicket = async (Assignee: string, TicketId?: string) => {
    
    dispatch({ type: ACTIONS.DELETE_TICKET })

    await deleteItem(Assignee, TicketId)
  }

  const openModalWithData = (Assignee: string, Description: string, PriorityLevel: string, TicketStatus: string, IssueType: string, TicketId?: string) => {
    setModalOpen(true)
    dispatch({ type: ACTIONS.EDIT_TICKET, ticketPayload: { Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId } })
  }

  return (
    <>
      <HorizontalNavbar>
        <Button>logo?</Button>
        { view ? <div style={{ color: 'white', fontSize: '30px' }}>BACKLOG</div> : <div style={{ color: 'white', fontSize: '30px' }}>SPRINT BOARD</div>}
        <Button>Sign In/Register</Button>
      </HorizontalNavbar>
      <VerticalNavbar>
        <Button onClick={() => {
          setView(true)
        }}>Backlog</Button>
        <Button onClick={() => {
          setView(false)
        }}>Sprint Board</Button>
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
          /> }
          {/*@ts-ignore*/}
      { !view && <SprintBoardView sprintBoardState={sprintBoardState} openModalWithData={openModalWithData}/> }
      { view && <BacklogView list={backlogState} openModalWithData={openModalWithData}/> }
    </>
  );
}

export {
  App,
  ACTIONS
};
