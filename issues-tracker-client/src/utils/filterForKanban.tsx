import { SprintBoardState, SprintBoardPayload } from "../../types"
import { Ticket, DateFont } from "../styles"
import { calculateDaysFunc } from "./calculateDays"

export const filterForKanban = (sprintBoardPayload: SprintBoardPayload | undefined): SprintBoardState => {
  const results: SprintBoardState = { Todo: [], Ongoing: [], Done: [] }
  
  if (!sprintBoardPayload) return results;

  const { items, openModalWithData } = sprintBoardPayload

  if (!items || items.length === 0) return results

  for (let i = 0; i < items.length; i++) {
      let status:string = items[i].TicketStatus || ''

      if (status !== 'Backlog') {
        let { Title, DueDate = '', Assignee, Description, TicketStatus, IssueType, TicketId } = items[i]
        let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)
        //@ts-ignore
        const dateColor = differenceInDays < 2 ? 'red' : 'black'
  
        let ticket = <Ticket onClick={() => {
          openModalWithData({ Title, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })
        }}>
          <p>{Title}</p>
          <p>{IssueType}</p>
          <footer>
            <p>{Assignee}</p>
            <DateFont $color={dateColor}>{formattedDeadline}</DateFont>
          </footer>
        </Ticket>
        
        results[status] = [...results[status], ticket]
      }

  }

  return results;
}