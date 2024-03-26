//@ts-nocheck
import { useState, useReducer, useEffect } from 'react'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { VerticalNavbar, Modal, BacklogView, KanbanBoardView } from './index';
import { Button } from '../styles';
import { Item, DeleteTicketType } from '../../types'
import { putItem, updateItem, deleteItem, queryFunc } from '../services';
import { issuesReducer, initialState, ACTIONS } from '../reducers/issuesReducer';


const IssuesTracker = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState(false)
  const [inputError, setInputError] = useState('')
  const authUser = useAuthUser()
  const [{ backlogState, formState, kanbanBoardState }, dispatch] = useReducer(issuesReducer, initialState)
  //@ts-ignore
  const { email: Email } = authUser()
  const signOut = useSignOut()

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        const items = await queryFunc({ Email })
        
        if (items?.length) {
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { backlog: items } })
          dispatch({ type: ACTIONS.UPDATE_KANBAN_BOARD, kanbanBoardPayload: { items, openModalWithData } })
        }
      }
    })()

  }, [modalOpen, Email])
  

  useEffect(() => {
    dispatch({ type: ACTIONS.UPDATE_KANBAN_BOARD, kanbanBoardPayload: { items: backlogState.backlog, openModalWithData } })
  }, [backlogState])


  const addTicket = ({ Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType }: Item) => {
    if (!Assignee || !Description) {
      
      setInputError('Assignee and Description cannot be empty')

    } else {
      
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
      if (inputError) setInputError(false)
    }
  }

  const updateTicket = async ({ Title = '', DueDate = '', Category = '', Assignee = '', Description = '', TicketStatus, IssueType, TicketId }: Item) => {
    
    if (Assignee.length === 0 || Description.length === 0 || !TicketId || !TicketStatus || !IssueType) {
      setInputError('Assignee and Description cannot be empty')
    } else {
      
      await updateItem({ Email, Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId })
      setModalOpen(false)
      if (inputError) setInputError(false)
    }
  }

  const deleteTicket = async ({ TicketId, selectedTickets }: DeleteTicketType) => {
    
    
    if (selectedTickets) {

      dispatch({ type: ACTIONS.DELETE_TICKET, backlogPayload: { selectedTickets } })
      
      await deleteItem({ Email, selectedTickets })

    }

    if (TicketId) {
      dispatch({ type: ACTIONS.DELETE_TICKET })
      await deleteItem({ Email, TicketId })
      setModalOpen(false)
    }
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
          dispatch({ 
            type: ACTIONS.UPDATE_BACKLOG, 
            backlogPayload: { 
              filteredView: false, 
              menuView: false, 
              deleteView: false, 
              filterDropdown: false 
            } })
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
            setInputError={setInputError}
          /> }
      { !view && <KanbanBoardView kanbanBoardState={kanbanBoardState} openModalWithData={openModalWithData}/> }
      { view && <BacklogView list={backlogState} openModalWithData={openModalWithData} dispatch={dispatch} deleteTicket={deleteTicket}/> }
    </>
  );
}

export {
  IssuesTracker
};