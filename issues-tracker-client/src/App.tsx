import { useState, useReducer, useEffect } from 'react'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button, Columns, SprintBoard } from './styles';
import { InitialState, Item } from '../types'
import { Modal } from './components';
import { putItem, scanFunc, updateItem, deleteItem } from './services';

const ACTIONS = {
  ADD_TICKET: 'add-ticket',
  SET_MODAL_STATE: 'set-form-state',
  EDIT_TICKET: 'modal-with-data',
  UPDATE_TICKET: 'update-ticket',
  DELETE_TICKET: 'delete-ticket',
  UPDATE_BACKLOG: 'update-backlog'
}

const initialState: InitialState = {
  formState: { Assignee: '', Description: '', PriorityLevel: '', TicketStatus: '', IssueType: '' },
  backlogState: []
}

type ActionType = {
  type: string;
  backlogPayload?: Item[];
  ticketPayload?: Item;
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState } = state
  
  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      return { backlogState: [...backlogState ], formState: initialState.formState }
    case ACTIONS.DELETE_TICKET:
      return { backlogState: initialState.backlogState, formState: initialState.formState}
    case ACTIONS.UPDATE_BACKLOG:
      return { 
        backlogState: action.backlogPayload ? [ ...action.backlogPayload ] : [ ...backlogState ], 
        formState: initialState.formState 
      }
    case ACTIONS.SET_MODAL_STATE:
      return { backlogState, formState: { ...formState, ...action.ticketPayload } }
    case ACTIONS.EDIT_TICKET:
      return { backlogState, formState: { ...formState, ...action.ticketPayload } }
    default:
      return initialState
  }
}

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [showBacklog, setBacklog] = useState(false)

  const [{ backlogState, formState }, dispatch] = useReducer(issuesReducer, initialState)

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        const items = await scanFunc()

        if (items?.length) {
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: items })
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
        <Button>Sign In/Register</Button>
      </HorizontalNavbar>
      <VerticalNavbar>
        <Button onClick={() => {
          setBacklog(!showBacklog)
        }}>Backlog</Button>
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
      { !showBacklog && 
        <SprintBoard>
          <Columns>
            heyoooo
          </Columns>
          <Columns>
            heyoooo
          </Columns>
          <Columns>
            heyoooo
          </Columns>
        </SprintBoard> }
      { showBacklog && <BacklogView list={backlogState} openModalWithData={openModalWithData}/> }
    </>
  );
}

export {
  App,
  ACTIONS
};
