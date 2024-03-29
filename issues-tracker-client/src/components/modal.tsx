import { TicketModal, ModalBackground } from "../styles";
import { Item, DeleteTicketType, ActionType } from "../../types";
import { ACTIONS } from '../reducers/issuesReducer'
import React from "react";

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: Item) => void;
  deleteTicket: ({ TicketId }: DeleteTicketType) => void;
  updateTicket: ({ Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => void;
  formState: Item;
  dispatch: ({ type, ticketPayload }: ActionType) => void;
  inputError: string;
  setInputError: (boolean: boolean) => void;
}

const Modal = ({ 
  setModalOpen, 
  addTicket, 
  updateTicket, 
  deleteTicket, 
  formState = { Title: '', DueDate: '', Category: '', Assignee: '', Description: '', TicketStatus: '', IssueType: '', TicketId: ''}, 
  dispatch, 
  inputError,
  setInputError
}: ModalPropsType) => {
  const { Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId } = formState
  
  const ticketStatusDropDown = ['Status', 'Todo', 'Ongoing', 'Done', 'Backlog']
  const issueTypeDropDown = ['Issue', 'Task', 'Feature', 'Bug']

  const handleChange = (e: React.FormEvent<HTMLInputElement 
    | HTMLSelectElement 
    | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    let name:string = (e!.target as HTMLInputElement)!.name;
    let value:string = (e!.target as HTMLInputElement)!.value;
    
    dispatch({ 
      type: ACTIONS.SET_MODAL_STATE,
      ticketPayload: { [name]: value }
    })
  }
  
  return (
    <ModalBackground>
      <TicketModal>
        <div className="modalHeader">
          {/*@ts-ignore*/}
          <input name="Assignee" type="text" placeholder="Assignee" value={Assignee} onChange={handleChange} />
          <button className="closeModal" onClick={() => { 
            setModalOpen(false)
            setInputError(false)
          }}>
              X
          </button>
        </div>
        <h4 style={{ fontSize: '130%'}}>{TicketId ? 'Edit Ticket' : 'Create a Ticket'}</h4>
        <form>
          <input className="TitleClass" name="Title" type="text" placeholder="Title" value={Title} onChange={handleChange} />
          <textarea className="DescriptionClass" name="Description" placeholder="Description" value={Description} onChange={handleChange}></textarea>
          <div className="inputAndDropdowns">
            <input name="DueDate" type="date" placeholder="DueDate" pattern="\d{4}-\d{2}-\d{2}" value={DueDate} onChange={handleChange} />
            <input name="Category" type="text" placeholder="Category" value={Category} onChange={handleChange} />
            <select name="TicketStatus" value={TicketStatus} onChange={handleChange}>
              {ticketStatusDropDown.map((elem, index) => {
                if (index === 0) return <option value="" disabled selected hidden>{elem}</option>

                return <option value={elem} key={elem}>{elem}</option>
              })}
            </select>
            <select name="IssueType" value={IssueType} onChange={handleChange}>
              {issueTypeDropDown.map((elem, index) => {
                if (index === 0) return <option value="" disabled selected hidden>{elem}</option>
                return <option value={elem} key={elem}>{elem}</option>
              })}
            </select>
          </div>
          {inputError && <div style={{ color: 'red' }}>{inputError}</div> }
        </form>
        <div className="buttonModalContainer">
          <button onClick={() => addTicket({ Title, Category, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })}>
            Add Ticket
          </button>
          <button onClick={() => {
            updateTicket({ Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId })
          }}>
            Update Ticket
          </button>
          <button onClick={() => {
            if (TicketId) {
              deleteTicket({ TicketId })
            }
          }}>
            Delete Ticket
          </button>
        </div>
      </TicketModal>
    </ModalBackground>
  );
}

export default Modal;