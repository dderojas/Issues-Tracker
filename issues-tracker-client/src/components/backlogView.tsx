import { Item } from '../../types'
import { Ticket, BacklogBoard } from '../styles'

type BacklogType = {
  list?: Item[];
  openModalWithData: (assignee: string, description: string, priorityLevel: string, TicketStatus: string, issueType: string, ticketId?: string) => void;
}

const BacklogView = ({ list = [], openModalWithData }: BacklogType) => {
  return (
    <BacklogBoard>
      {list?.map((elem: Item) => {
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
          }}>
            <div>{elem.Assignee}</div>
            <div>{elem.Description}</div>
            <div>{elem.PriorityLevel}</div>
            <div>{elem.IssueType}</div>
            <div>{elem.TicketStatus}</div>
          </Ticket>
        )
      })}
    </BacklogBoard>
  )
}

export default BacklogView