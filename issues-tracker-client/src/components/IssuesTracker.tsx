import { useState, useReducer, useEffect } from 'react'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { Modal, BacklogView, KanbanBoardView } from './index';
import { VerticalNavButton, VerticalNav } from '../styles';
import { Item, DeleteTicketType, FormState } from '../../types'
import { putItem, updateItem, deleteItem, queryFunc } from '../services';
import { issuesReducer, initialState, ACTIONS } from '../reducers/issuesReducer';

const IssuesTracker = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [view, setView] = useState(false)
  const [inputError, setInputError] = useState('')
  const authUser = useAuthUser()
  const [{ backlogState, formState, kanbanBoardState }, dispatch] = useReducer(issuesReducer, initialState)
  const { email: Email } = authUser() as { email: string }
  const signOut = useSignOut()

  useEffect(() => {
    (async () => {
      if (!modalOpen) {
        const items = await queryFunc(Email)

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


  const addTicket = ({ Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId }: FormState) => {
    if (!Assignee || !Description) {
      
      setInputError('Assignee and Description cannot be empty')

    } else if (TicketId) {
      setInputError('Ticket already exists')
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
      if (inputError) setInputError('')
    }
  }

  const updateTicket = async ({ Title = '', DueDate = '', Category = '', Assignee = '', Description = '', TicketStatus, IssueType, TicketId }: Item) => {
    
    if (Assignee.length === 0 || Description.length === 0 || !TicketId || !TicketStatus || !IssueType) {

      setInputError('Assignee and Description cannot be empty')

    } else {
      dispatch({ 
        type: ACTIONS.SET_MODAL_STATE,
        ticketPayload: initialState.formState
      })

      await updateItem({ Email, Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId })
      setModalOpen(false)

      if (inputError) setInputError('')
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
    dispatch({ type: ACTIONS.EDIT_TICKET, modalWithDataPayload: { Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId } })
    dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false } })
    setModalOpen(true)

  }

  return (
    <>
      <VerticalNav>
        <VerticalNavButton onClick={signOut}>Sign Out / Register</VerticalNavButton>
        <VerticalNavButton id="Backlog" view={view} onClick={() => {
          setView(true)
        }}>Backlog</VerticalNavButton>
        <VerticalNavButton id="Kanban" view={view} onClick={() => {
          setView(false)
          dispatch({ 
            type: ACTIONS.UPDATE_BACKLOG, 
            backlogPayload: { 
              filteredView: false, 
              menuView: false, 
              deleteView: false, 
              filterDropdown: false
            } })
        }}>Kanban Board</VerticalNavButton>
        <VerticalNavButton onClick={() => {
          setModalOpen(true)
          dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false } })
        }}>Create Ticket</VerticalNavButton>
      </VerticalNav>
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