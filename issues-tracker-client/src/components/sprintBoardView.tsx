import { SprintBoard, Columns, Ticket } from '../styles'
import { SprintBoardState, Item } from '../../types'

type SprintBoardType = {
  sprintBoardState: SprintBoardState;
  openModalWithData: ({ Assignee, Description, PriorityLevel, TicketStatus, IssueType, TicketId }: Item) => void;
}

const SprintBoardView = ({ sprintBoardState, openModalWithData }: SprintBoardType) => {
  const { todo, inProgress, done } = sprintBoardState

  return (
    <SprintBoard>
      <Columns>
        {todo?.map(({ Assignee, Description, PriorityLevel, IssueType, TicketStatus, TicketId }: Item) => {
          return (
            <Ticket onClick={() => {
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
      </Columns>
      <Columns>
      {inProgress?.map(({ Assignee, Description, PriorityLevel, IssueType, TicketStatus, TicketId }: Item) => {
          return (
            <Ticket onClick={() => {
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
      </Columns>
      <Columns>
      {done?.map(({ Assignee, Description, PriorityLevel, IssueType, TicketStatus, TicketId }: Item) => {
          return (
            <Ticket onClick={() => {
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
      </Columns>
    </SprintBoard>
  )
}

export {
  SprintBoardView
}