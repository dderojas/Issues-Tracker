import { Item } from '../../types'
import { Ticket, BacklogBoard } from '../styles'

type BacklogType = {
  list?: Item[];
  openModalWithData: ({ Title, Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => void;
}

const BacklogView = ({ list = [], openModalWithData }: BacklogType) => {
  return (
    <BacklogBoard>
      {list?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate }: Item) => {
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