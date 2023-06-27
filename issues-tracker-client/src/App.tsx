import { useState, useReducer, useEffect } from 'react'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button } from './styles';
import { TicketType, InitialState, FormState } from '../types'
import { Modal } from './components';
import { putItem, scanFunc, updateItem, deleteItem } from './services';

const ACTIONS = {
  ADD_TICKET: 'add ticket',
  SET_MODAL_STATE: 'set-form-state',
  EDIT_TICKET: 'modal-with-data',
  UPDATE_TICKET: 'update-ticket',
  DELETE_TICKET: 'delete-ticket',
  UPDATE_BACKLOG: 'update-backlog'
}

const initialState: InitialState = {
  formState: { id: -Infinity, issue: '', description: '', priorityLevel: '' },
  backlogState: []
}

type ActionType = {
  type: string;
  payload?: FormState | TicketType;
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState } = state

  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      // @ts-ignore
      return { backlogState: [...backlogState ], formState: initialState.formState }
    case ACTIONS.UPDATE_BACKLOG:
      // @ts-ignore
      return { backlogState: [...action.payload ], formState: initialState.formState }
    case ACTIONS.SET_MODAL_STATE:
      return { backlogState, formState: { ...formState, ...action.payload } }
    case ACTIONS.EDIT_TICKET:
      return { backlogState, formState: { ...formState, ...action.payload } }
    default:
      return initialState
  }
}

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [showBacklog, setBacklog] = useState(false)

  const [{ backlogState, formState }, dispatch] = useReducer(issuesReducer, initialState)
  console.log(formState, 'inAppparentttttt')

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        const results = await scanFunc()
        console.log(results, 'results!!@#!@#')

        dispatch({ type: ACTIONS.UPDATE_BACKLOG, payload: results.Items})
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
      [e.target[2].name]: e.target[2].value
    })
  }
// do I need this id now?
  const updateTicket = async (e: any, id: any, issue: string, description: string, priorityLevel: string) => {

    await updateItem({ issue, description, priorityLevel })
  }

  const deleteTicket = async (issue: string) => {

    await deleteItem(issue)
  }

  const openModalWithData = (issue:any, description: any, priorityLevel: string) => {
    console.log(issue, description, priorityLevel, 'test in openmodalwdata!!!')
    setModalOpen(true)
    dispatch({ type: ACTIONS.EDIT_TICKET, payload: { issue, description, priorityLevel } })
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
        { modalOpen && <Modal setModalOpen={setModalOpen} addTicket={addTicket} updateTicket={updateTicket} deleteTicket={deleteTicket} formState={formState} dispatch={dispatch}/> }
      <div style={{ display: 'flex', paddingLeft: '12%', paddingTop: '7%' }}>
        { showBacklog && <BacklogView list={backlogState} openModalWithData={openModalWithData}/> }
      </div>
    </>
  );
}

export default App;
