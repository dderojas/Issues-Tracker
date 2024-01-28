import { SprintBoard, Columns, Ticket, DateFont } from '../styles'
import { SprintBoardState, Item } from '../../types'
import { calculateDaysFunc } from '../utils/calculateDays'

type SprintBoardType = {
  sprintBoardState: SprintBoardState;
  openModalWithData: ({ Title, Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => void;
}

const SprintBoardView = ({ sprintBoardState, openModalWithData }: SprintBoardType) => {
  const { todo, inProgress, done } = sprintBoardState

  return (
    <SprintBoard>
      <Columns>
        {todo?.map(({ Title, DueDate = 'NEEDS DUE DATE', Assignee, Description, IssueType, TicketStatus, TicketId }: Item) => {
          let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)
          const dateColor = differenceInDays < 2 ? 'red' : 'black'

          return (
            <Ticket onClick={() => {
              openModalWithData({ Title, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })
            }}>
              <p>{Title}</p>
              <p>{IssueType}</p>
              <footer>
                <p>{Assignee}</p>
                <DateFont $color={dateColor}>{formattedDeadline}</DateFont>
              </footer>
            </Ticket>
          )
        })}
      </Columns>
      <Columns>
      {inProgress?.map(({ Title, DueDate, Assignee, Description, IssueType, TicketStatus, TicketId }: Item) => {
          return (
            <Ticket onClick={() => {
              openModalWithData({ Title, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })
            }}>
              <p>{Title}</p>
              <p>{IssueType}</p>
              <footer>
                <p>{Assignee}</p>
                <p>{DueDate}</p>
              </footer>
            </Ticket>
          )
        })}
      </Columns>
      <Columns>
      {done?.map(({ Title, DueDate, Assignee, Description, IssueType, TicketStatus, TicketId }: Item) => {
          return (
            <Ticket onClick={() => {
              openModalWithData({ Title, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })
            }}>
              <p>{Title}</p>
              <p>{IssueType}</p>
              <footer>
                <p>{Assignee}</p>
                <p>{DueDate}</p>
              </footer>
            </Ticket>
          )
        })}
      </Columns>
    </SprintBoard>
  )
}

export {
  SprintBoardView
}