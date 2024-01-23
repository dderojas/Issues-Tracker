import { Item, DispatchType, BacklogState } from '../../types'
import { Ticket, BacklogBoard } from '../styles'
import { ACTIONS } from './issuesTracker'

type BacklogType = {
  list?: BacklogState;
  openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void;
  dispatch: ({ type, backlogPayload }: DispatchType) => void;
}

const BacklogView = ({ list = { backlog: [], filteredLog: [], filteredView: false }, openModalWithData, dispatch }: BacklogType) => {
  
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    let value:string = (e!.target as HTMLSelectElement)!.value;
    let name: string = (e!.target as HTMLSelectElement)!.name;

    if (value === 'All') {
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { filteredView: false } })
      return;
    }

    if (name === 'typeofbuggg') {
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { issueTypeFilter:  value, filteredView: true } })
    }
  }
  
  return (
    <BacklogBoard>
      <select name="typeofbuggg" onChange={handleChange}>
        <option>All</option>
        <option>Task</option>
        <option>Feature</option>
        <option>Bug</option>
      </select>
      { list.filteredView ? list.filteredLog?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate }: Item) => {
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
          }}>
            <div>{Title}</div>
            <div>{IssueType}</div>
            <footer>
              <div>{Assignee}</div>
              <div>{DueDate}</div>
            </footer>
          </Ticket>
        )
      }) : list.backlog?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate }: Item) => {
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
          }}>
            <div>{Title}</div>
            <div>{IssueType}</div>
            <footer>
              <div>{Assignee}</div>
              <div>{DueDate}</div>
            </footer>
          </Ticket>
        )
      })}
    </BacklogBoard>
  )
}

export default BacklogView