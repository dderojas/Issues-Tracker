import { useState, useReducer, useEffect } from 'react'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { VerticalNavbar, Modal, BacklogView, SprintBoardView } from './index';
import { Button } from '../styles';
import { InitialState, Item, SprintBoardState, BacklogState, DeleteTicketType } from '../../types'
import { putItem, updateItem, deleteItem, queryFunc } from '../services';


const newMockData: any = [
  {
    Email: 'don@don.com',
    Title: 'First Ticket',
    Comments: 'NONE',
    DueDate: 'Jan 24, 2024',
    Category: 'N/A',
    Assignee: 'Don',
    Description: 'something',
    TicketStatus: 'Todo',
    IssueType: 'Task',
  },
  {
    Email: 'sun@sun.com',
    Title: 'Second Ticket',
    Comments: 'NONE',
    DueDate: 'Jan 24, 2024',
    Assignee: 'sun',
    Description: 'bada',
    TicketStatus: 'In Progress',
    IssueType: 'Bug',
  },
  {
    Email: 'steph@steph.com',
    Title: 'Third Ticket',
    DueDate: 'Jan 24, 2024',
    Comments: 'NONE',
    Assignee: 'steph',
    Description: 'bing',
    TicketStatus: 'Done',
    IssueType: 'Feature',
  }
]

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
  sprintBoardState: { todo: [], inProgress: [], done: [] }
}

type ActionType = {
  type: string;
  backlogPayload?: BacklogState;
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

const backlogStateFunc = (payload: BacklogState | undefined, backlogState: BacklogState) => {
  const results: BacklogState = { ...backlogState, ...payload }

  if (results.backlog) {
    if (payload?.filteredView) {
      results.filteredLog = results.backlog.filter((elem) => {
        return elem.IssueType === payload.issueTypeFilter
      })
    }
  
    if (payload?.backlog && results.filteredView) {
        results.filteredLog = results.backlog.filter((elem) => {
          return elem.IssueType === results.issueTypeFilter
        })
    }

  }


  return results
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

const IssuesTracker = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState(false)
  const [inputError, setInputError] = useState('')
  const authUser = useAuthUser()
  const [{ backlogState, formState, sprintBoardState }, dispatch] = useReducer(issuesReducer, initialState)
  //@ts-ignore
  const { email: Email } = authUser()
  // const Email = 'don@don.com'
  const signOut = useSignOut()

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        // const items = newMockData
        const items = await queryFunc({ Email })
        
        if (items?.length) {
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { backlog: items } })
          dispatch({ type: ACTIONS.UPDATE_SPRINT_BOARD, sprintBoardPayload: items })
        }
      }
    })()
    
  }, [modalOpen, Email])
  
  const addTicket = ({ Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType }: Required<Item>) => {
    if (!Assignee || !Description) {
      
      setInputError('Assignee and Description cannot be empty')

    } else {
      dispatch({ type: ACTIONS.ADD_TICKET })
      
      putItem({
        Email,
        Title,
        DueDate,
        Category,
        Assignee,
        Description,
        TicketStatus,
        IssueType
      })
  
      setModalOpen(false)
    }
  }

  const updateTicket = async ({ Title = '', DueDate = '', Category = '', Assignee = '', Description = '', TicketStatus, IssueType, TicketId }: Item) => {
    if (Assignee.length === 0 || Description.length === 0 || !TicketId || !TicketStatus || !IssueType) {
      setInputError('Assignee and Description cannot be empty')
    } else {
      dispatch({ type: ACTIONS.ADD_TICKET })
      
      await updateItem({ Email, Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId })
      setModalOpen(false)
    }
  }

  const deleteTicket = async ({ TicketId }: DeleteTicketType) => {
    
    dispatch({ type: ACTIONS.DELETE_TICKET })

    await deleteItem(TicketId)

    setModalOpen(false)
  }

  const openModalWithData = ({ Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => {
    dispatch({ type: ACTIONS.EDIT_TICKET, ticketPayload: { Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId } })
    setModalOpen(true)
  }

  return (
    <>
      <VerticalNavbar>
        <Button onClick={signOut}>Sign Out / Register</Button>
        <Button onClick={() => {
          setView(true)
        }}>Backlog</Button>
        <Button onClick={() => {
          setView(false)
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { filteredView: false } })
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
      { view && <BacklogView list={backlogState} openModalWithData={openModalWithData} dispatch={dispatch} /> }
    </>
  );
}

export {
  IssuesTracker,
  ACTIONS
};