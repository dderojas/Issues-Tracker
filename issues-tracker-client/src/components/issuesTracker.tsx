import { useState, useReducer, useEffect } from 'react'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { VerticalNavbar, Modal, BacklogView, SprintBoardView } from './index';
import { Button } from '../styles';
import { Item, DeleteTicketType } from '../../types'
import { putItem, updateItem, deleteItem, queryFunc } from '../services';
import { issuesReducer, initialState, ACTIONS } from '../reducers/issuesReducer';


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


const IssuesTracker = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState(false)
  const [inputError, setInputError] = useState('')
  const authUser = useAuthUser()
  const [{ backlogState, formState, sprintBoardState }, dispatch] = useReducer(issuesReducer, initialState)
  //@ts-ignore
  const { email: Email } = authUser()
  const signOut = useSignOut()

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        const items = await queryFunc({ Email })
        
        if (items?.length) {
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { backlog: items } })
          dispatch({ type: ACTIONS.UPDATE_SPRINT_BOARD, sprintBoardPayload: { items, openModalWithData } })
        }
      }
    })()
    
  }, [modalOpen, Email])
  
  const addTicket = ({ Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType }: Item) => {
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
  IssuesTracker
};