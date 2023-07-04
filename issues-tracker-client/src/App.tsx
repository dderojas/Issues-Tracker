import { useState, useReducer, useEffect } from 'react'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button } from './styles';
import { InitialState, FormState, Item } from '../types'
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
  formState: { Assignee: '', Description: '', PriorityLevel: '', Status: '', IssueType: '' },
  backlogState: []
}

type ActionType = {
  type: string;
  backlogPayload?: FormState[] | Item[];
  ticketPayload?: Item;
}

const issuesReducer = (state: InitialState, action: ActionType): InitialState => {
  const { formState, backlogState } = state
  
  switch(action.type) {
    case ACTIONS.ADD_TICKET:
      return { backlogState: [...backlogState ], formState: initialState.formState }
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
        console.log(items, 'results!!@#!@#')

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

  const updateTicket = async ({ Assignee, Description, PriorityLevel, Status, IssueType }: FormState) => {

    await updateItem({ Assignee, Description, PriorityLevel, Status, IssueType })
  }

  const deleteTicket = async (issue: string) => {

    await deleteItem(issue)
  }

  const openModalWithData = (Assignee: string, Description: string, PriorityLevel: string, Status: string, IssueType: string) => {
    setModalOpen(true)
    dispatch({ type: ACTIONS.EDIT_TICKET, ticketPayload: { Assignee, Description, PriorityLevel, Status, IssueType } })
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

export {
  App,
  ACTIONS
};
