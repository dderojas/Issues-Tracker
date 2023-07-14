import { SprintBoard, Columns, Ticket } from '../styles'

const SprintBoardView = (props:any) => {

  return (
    <SprintBoard>
      <Columns>
        {props.sprintBoardState.todo?.map((elem:any) => {
          return (
            <Ticket onClick={() => {
              props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
            }}>
              <div>{elem.Assignee}</div>
              <div>{elem.Description}</div>
              <div>{elem.PriorityLevel}</div>
              <div>{elem.IssueType}</div>
              <div>{elem.TicketStatus}</div>
            </Ticket>
          )
        })}
      </Columns>
      <Columns>
        {props.sprintBoardState.inProgress?.map((elem:any) => {
          return (
            <Ticket onClick={() => {
              props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
            }}>
              <div>{elem.Assignee}</div>
              <div>{elem.Description}</div>
              <div>{elem.PriorityLevel}</div>
              <div>{elem.IssueType}</div>
              <div>{elem.TicketStatus}</div>
            </Ticket>
          )
        })}
      </Columns>
      <Columns>
        {props.sprintBoardState.done?.map((elem:any) => {
          return (
            <Ticket onClick={() => {
              props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
            }}>
              <div>{elem.Assignee}</div>
              <div>{elem.Description}</div>
              <div>{elem.PriorityLevel}</div>
              <div>{elem.IssueType}</div>
              <div>{elem.TicketStatus}</div>
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