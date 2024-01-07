import { ModalContainer, ModalBackground } from "../styles";
import { Item, DispatchType, DeleteTicketType } from "../../types";
import { ACTIONS } from './issuesTracker'
import React from "react";

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: Item) => void;
  // might only need ticketId for delete ticket
  deleteTicket: ({ Assignee, TicketId }: DeleteTicketType) => void;
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
  formState = { Title: '', DueDate: '', Project: '', Assignee: '', Description: '', TicketStatus: '', IssueType: '', TicketId: ''}, 
  dispatch, 
  inputError  
}: ModalPropsType) => {
  const { Title, DueDate, Project, Assignee, Description, TicketStatus, IssueType, TicketId } = formState
  
  const ticketStatusDropDown = ['Choose Ticket Status', 'Todo', 'In Progress', 'Done']
  const issueTypeDropDown = ['Choose Issue Type', 'Task', 'Feature', 'Bug']

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <input className="DescriptionClass" name="Description" type="text" placeholder="Description" value={Description} onChange={handleChange} />
          <div>
            <input name="Assignee" type="text" placeholder="Assignee" value={Assignee} onChange={handleChange} />
            <input name="DueDate" type="text" placeholder="DueDate" value={DueDate} onChange={handleChange} />
            <input name="Project" type="text" placeholder="Project" value={Project} onChange={handleChange} />
          </div>
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
          {inputError && <div style={{ color: 'red' }}>{inputError}</div> }
          <button type="submit" onClick={() => addTicket({ Title, Project, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })}>
            Add Ticket
          </button>
        </form>
          <button onClick={(e) => {
            updateTicket({ Title, DueDate, Project, Assignee, Description, TicketStatus, IssueType, TicketId })
          }}>
            Update Ticket
          </button>
          <button onClick={(e) => {
            if (Assignee && TicketId) {
              deleteTicket({ Assignee, TicketId })
            }
          }}>
            Delete Ticket
          </button>
          <div className="titleCloseBtn">
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;