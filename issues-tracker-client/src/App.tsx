import { useState, useReducer } from 'react'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button } from './styles';
import { Ticket, InitialState, FormState } from '../types'
import { Modal } from './components';

const ACTIONS = {
  ADD_TICKET: 'add ticket',
  SET_FORM_STATE: 'set-form-state'
}

const initialState: InitialState = {
  formState: { issue: '', description: '' },
  backlogState: []
}

type ActionType = {
  type: string;
  payload: FormState | Ticket;
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState } = state

  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      return { backlogState: [...backlogState, action.payload], formState: initialState.formState }
    case ACTIONS.SET_FORM_STATE:
      return { backlogState, formState: { ...formState, ...action.payload} }
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
        [e.target[0].name]: e.target[0].value,
        [e.target[1].name]: e.target[1].value
      }
    })
  }

  const openModalWithData = (e:any) => {
    e.preventDefault()
    console.log(e.target, 'adsfasdfasdfads')
    // dispatch()
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
        {modalOpen && <Modal setModalOpen={setModalOpen} addTicket={addTicket} formState={formState} dispatch={dispatch}/>}
      <div style={{ display: 'flex', paddingLeft: '12%', paddingTop: '7%' }}>
        { showBacklog && <BacklogView list={backlogState} openModalWithData={openModalWithData}/> }
      </div>
    </>
  );
}

export default App;
