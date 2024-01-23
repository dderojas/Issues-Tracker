import { ModalContainer, ModalBackground } from "../styles";
import { Item, DispatchType, DeleteTicketType } from "../../types";
import { ACTIONS } from './issuesTracker'
import React from "react";

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: Required<Item>) => void;
  deleteTicket: ({ TicketId }: DeleteTicketType) => void;
  updateTicket: ({ Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => void;
  formState: Item;
  dispatch: ({ type, ticketPayload }: DispatchType) => void;
  inputError: string;
}

const Modal = ({ 
  setModalOpen, 
  addTicket, 
  updateTicket, 
  deleteTicket, 
  formState = { Title: '', DueDate: '', Category: '', Assignee: '', Description: '', TicketStatus: '', IssueType: '', TicketId: ''}, 
  dispatch, 
  inputError  
}: ModalPropsType) => {
  const { Title, DueDate, Category, Assignee, Description, TicketStatus, IssueType, TicketId } = formState
  
  const ticketStatusDropDown = ['Choose Ticket Status', 'Todo', 'In Progress', 'Done']
  const issueTypeDropDown = ['Choose Issue Type', 'Task', 'Feature', 'Bug']

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
      <ModalContainer>
        <button className="closeModal" onClick={() => { setModalOpen(false) }}>X</button>
        <h4>{TicketId ? 'Edit Ticket' : 'Create a Ticket'}</h4>
        <form>
          <input className="TitleClass" name="Title" type="text" placeholder="Title" value={Title} onChange={handleChange} />
          <textarea className="DescriptionClass" name="Description" placeholder="Description" value={Description} onChange={handleChange}></textarea>
          <div>
            <input name="Assignee" type="text" placeholder="Assignee" value={Assignee} onChange={handleChange} />
            <input name="DueDate" type="text" placeholder="DueDate" value={DueDate} onChange={handleChange} />
            <input name="Category" type="text" placeholder="Category" value={Category} onChange={handleChange} />
          </div>
          <div className="modalSelectContainer">
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
          {/*@ts-ignore */}
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
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;