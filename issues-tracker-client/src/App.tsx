import { useState, useReducer } from 'react'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button } from './styles';
import { TicketType, InitialState, FormState } from '../types'
import { Modal } from './components';

const ACTIONS = {
  ADD_TICKET: 'add ticket',
  SET_MODAL_STATE: 'set-form-state',
  EDIT_TICKET: 'modal-with-data',
  UPDATE_TICKET: 'update-ticket',
  DELETE_TICKET: 'delete-ticket'
}

const initialState: InitialState = {
  formState: { id: -Infinity, issue: '', description: '' },
  backlogState: []
}

type ActionType = {
  type: string;
  payload: FormState | TicketType;
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState } = state

  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      return { backlogState: [...backlogState, action.payload], formState: initialState.formState }
    case ACTIONS.SET_MODAL_STATE:
      return { backlogState, formState: { ...formState, ...action.payload} }
    case ACTIONS.EDIT_TICKET:
      return { backlogState, formState: { ...formState, ...action.payload} }
    case ACTIONS.UPDATE_TICKET:
      return { backlogState: backlogState.map((elem) => {
        if (elem.id === action.payload.id) {
          elem = { ...action.payload }
        }
        return elem
      }), formState: initialState.formState }
    case ACTIONS.DELETE_TICKET:
      return { backlogState: backlogState.filter((elem) => {
        return elem.id !== action.payload.id
      }) 
        , formState: { ...formState } }
    default:
      return initialState
  }
}

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [showBacklog, setBacklog] = useState(false)

  const [{ backlogState, formState }, dispatch] = useReducer(issuesReducer, initialState)

  // add type for "e", maybe React.FormEvent<HTMLInputElement>
  const addTicket = (e: any) => {
    e.preventDefault()
    dispatch({ 
      type: ACTIONS.ADD_TICKET, 
      payload: {
        id: Date.now(),
        [e.target[0].name]: e.target[0].value,
        [e.target[1].name]: e.target[1].value
      }
    })
  }

  const updateTicket = (e: any, id: any, issue: string, description: string) => {
    // e.preventDefault()
    dispatch({ 
      type: ACTIONS.UPDATE_TICKET, 
      payload: {
        id,
        issue,
        description
      }
    })
  }

  const deleteTicket = (id: number) => {
    dispatch({ 
      type: ACTIONS.DELETE_TICKET, 
      payload: { id }
    })
  }

  const openModalWithData = (issue:any, description: any, id: number) => {
    setModalOpen(true)
    dispatch({ type: ACTIONS.EDIT_TICKET, payload: { issue, description, id } })
  }

  return (
    <>
        <HorizontalNavbar>
          <Button>put item</Button>
          <Button>Sign In/Register</Button>
        </HorizontalNavbar>
        <VerticalNavbar>
          <Button onClick={() => {
            setBacklog(!showBacklog)
          }}>Backlog</Button>
          <Button>delete item</Button>
          <Button onClick={() => setModalOpen(true)}>Create Ticket</Button>
        </VerticalNavbar>
        {modalOpen && <Modal setModalOpen={setModalOpen} addTicket={addTicket} updateTicket={updateTicket} deleteTicket={deleteTicket} formState={formState} dispatch={dispatch}/>}
      <div style={{ display: 'flex', paddingLeft: '12%', paddingTop: '7%' }}>
        { showBacklog && <BacklogView list={backlogState} openModalWithData={openModalWithData}/> }
      </div>
    </>
  );
}

export default App;
