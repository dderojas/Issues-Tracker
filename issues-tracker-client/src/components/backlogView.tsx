import { Item } from '../../types'
import { Ticket, BacklogBoard } from '../styles'

type BacklogType = {
  list?: Item[];
  openModalWithData: ({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId }: Item) => void;
}

const BacklogView = ({ list = [], openModalWithData }: BacklogType) => {
  return (
    <BacklogBoard>
      {list?.map(({ Assignee, Description, PriorityLevel, IssueType, TicketStatus, TicketId }: Item) => {
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId })
          }}>
            <div>{Assignee}</div>
            <div>{Description}</div>
            <div>{PriorityLevel}</div>
            <div>{IssueType}</div>
            <div>{TicketStatus}</div>
          </Ticket>
        )
      })}
    </BacklogBoard>
  )
}

export default BacklogView