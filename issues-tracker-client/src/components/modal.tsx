import { ModalContainer, ModalBackground } from "../styles";
import { FormState, Item, DispatchType, DeleteTicketType } from "../../types";
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

const Modal = ({ setModalOpen, addTicket, updateTicket, deleteTicket, formState = { Assignee: '', Description: '', TicketStatus: '', IssueType: '', TicketId: ''}, dispatch, inputError  }: ModalPropsType) => {
  const { Assignee, Description, TicketStatus, IssueType, TicketId } = formState
  
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
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Close Modal
          </button>
        </div>
        <h1>{TicketId ? 'Edit Ticket' : 'Create a Ticket'}</h1>
        <form>
          <input name="Assignee" type="text" placeholder="Assignee" value={Assignee} onChange={handleChange} />
          <input name="Description" type="text" placeholder="Description" value={Description} onChange={handleChange} />
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
          <button type="submit" onClick={() => addTicket({ Assignee, Description, TicketStatus, IssueType, TicketId })}>
            Add Ticket
          </button>
        </form>
          <button onClick={(e) => {
            updateTicket({ Assignee, Description, TicketStatus, IssueType, TicketId })
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
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;