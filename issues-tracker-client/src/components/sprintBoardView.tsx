import { SprintBoard, Columns, Ticket } from '../styles'
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
        {todo?.map(({ Title, DueDate, Assignee, Description, IssueType, TicketStatus, TicketId }: Item) => {
          ///@ts-ignore
          let something = new Date(DueDate)
          return (
            <Ticket onClick={() => {
              openModalWithData({ Title, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })
            }}>
              <p>{Title}</p>
              <p>{IssueType}</p>
              <footer>
                <p>{Assignee}</p>
                {/*@ts-ignore*/}
                <p>{something.toDateString()}</p>
              </footer>
            </Ticket>
          )
        })}
      </Columns>
      <Columns>
      {inProgress?.map(({ Title, DueDate, Assignee, Description, IssueType, TicketStatus, TicketId }: Item) => {
          return (
            <Ticket onClick={() => {
              openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId })
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