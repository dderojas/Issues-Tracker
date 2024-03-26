import { KanbanBoardState, KanbanBoardPayload } from "../../types"
import { KanbanTicket, DateFont } from "../styles"
import { calculateDaysFunc } from "./calculateDays"

export const filterForKanban = (kanbanBoardPayload: KanbanBoardPayload | undefined): KanbanBoardState => {
  const results: KanbanBoardState = { Todo: [], Ongoing: [], Done: [] }
  
  if (!kanbanBoardPayload) return results;

  const { items, openModalWithData } = kanbanBoardPayload

  if (!items || items.length === 0) return results

  for (let i = 0; i < items.length; i++) {
      let status:string = items[i].TicketStatus || ''

      if (status !== 'Backlog') {
        let { Title, DueDate = '', Assignee, Description, TicketStatus, IssueType, TicketId } = items[i]
        let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)
        
        const dateColor = !differenceInDays || differenceInDays > 2 ? 'black' : 'red'
  
        let ticket = <KanbanTicket onClick={() => {
          openModalWithData({ Title, DueDate, Assignee, Description, TicketStatus, IssueType, TicketId })
        }}>
          <p>{Title}</p>
          <p>{IssueType}</p>
          <footer>
            <p>{Assignee}</p>
            <DateFont $color={dateColor}>{formattedDeadline}</DateFont>
          </footer>
        </KanbanTicket>
        
        results[status] = [...results[status], ticket]
      }

  }

  return results;
}