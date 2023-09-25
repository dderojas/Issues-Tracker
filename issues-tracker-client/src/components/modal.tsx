import { ModalContainer, ModalBackground } from "../styles";
import { FormState, Item } from "../../types";
import { ACTIONS } from './issuesTracker'

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: any) => void;
  deleteTicket: (Assignee: string, TicketId?: string) => void;
  updateTicket: ({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId }: Item) => void;
  formState: Item;
  dispatch: (something: any) => void;
}
//@ts-ignore
const Modal = ({ setModalOpen, addTicket, updateTicket, deleteTicket, formState = { Assignee: '', Description: '', PriorityLevel: '', TicketStatus: '', IssueType: '', TicketId: ''}, dispatch, inputError  }: ModalPropsType) => {
  const { Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId } = formState
  
  const ticketStatusDropDown = ['Choose Ticket Status', 'Todo', 'In Progress', 'Done']
  const priorityLevelDropDown = ['Choose Priority Level', 'High', 'Medium', 'Low']
  const issueTypeDropDown = ['Choose Issue Type', 'Feature', 'Bug']

  const handleChange = (e: any) => {
    e.preventDefault()
    dispatch({ 
      type: ACTIONS.SET_MODAL_STATE,
      ticketPayload: { [e.target.name]: e.target.value }
    })
  }
  
  return (
    <ModalBackground>
      <ModalContainer onSubmit={addTicket}>
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
          <select name="PriorityLevel" value={PriorityLevel} onChange={handleChange}>
            {priorityLevelDropDown.map((elem, index) => {
              if (index === 0) return <option value="" disabled selected hidden>{elem}</option>

              return <option value={elem} key={elem}>{elem}</option>
            })}
          </select>
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
          <button>Add Ticket</button>
        </form>
          <button onClick={(e) => {
            updateTicket({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId })
          }}>
            Update Ticket
          </button>
          <button onClick={(e) => {
            deleteTicket(Assignee, TicketId)
          }}>
            Delete Ticket
          </button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;