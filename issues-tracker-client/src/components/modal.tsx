import { ModalContainer, ModalBackground } from "../styles";

const ACTIONS = {
  ADD_TICKET: 'add ticket',
  SET_FORM_STATE: 'set-form-state'
}

type ModalPropsType = {
  setModalOpen: (boolean: boolean) => void;
  addTicket: (state: any) => void;
  formState: { issue: string, description: string };
  dispatch: (something: any) => void;
}

const Modal = ({ setModalOpen, addTicket, formState = { issue: '', description: ''}, dispatch  }: ModalPropsType) => {

  const handleChange = (e: any) => {
    e.preventDefault()
    dispatch({ 
      type: ACTIONS.SET_FORM_STATE,
      payload: { [e.target.name]: e.target.value }
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
          <input name="issue" type="text" value={formState.issue} onChange={handleChange} />
          <input name="description" type="text" value={formState.description} onChange={handleChange} />
          <button>add ticket</button>
          <button>update Ticket</button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;