import { ModalContainer, ModalBackground } from "../styles";
import { FormState } from "../../types";
import { ACTIONS } from '../App'

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: any) => void;
  deleteTicket: (issue: string) => void;
  updateTicket: ({ Assignee, Description, PriorityLevel, Status, IssueType }: FormState) => void;
  formState: FormState;
  dispatch: (something: any) => void;
}

const Modal = ({ setModalOpen, addTicket, updateTicket, deleteTicket, formState = { Assignee: '', Description: '', PriorityLevel: '', Status: '', IssueType: ''}, dispatch  }: ModalPropsType) => {
  const { Assignee, Description, PriorityLevel, Status, IssueType } = formState
  
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
        <h1>Create a Ticket</h1>
        <form>
          <input name="Assignee" type="text" placeholder="Assignee" value={Assignee} onChange={handleChange} />
          <input name="Description" type="text" placeholder="Description" value={Description} onChange={handleChange} />
          <input name="PriorityLevel" type="text" placeholder="Priority Level" value={PriorityLevel} onChange={handleChange} />
          <input name="Status" type="text" placeholder="Status" value={Status} onChange={handleChange} />
          <input name="IssueType" type="text" placeholder="Issue Type" value={IssueType} onChange={handleChange} />
          <button>Add Ticket</button>
        </form>
          <button onClick={(e) => {
            updateTicket({ Assignee, Description, PriorityLevel, Status, IssueType })
          }}>
            Update Ticket
          </button>
          <button onClick={(e) => {
            deleteTicket(Assignee)
          }}>
            Delete Ticket
          </button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;