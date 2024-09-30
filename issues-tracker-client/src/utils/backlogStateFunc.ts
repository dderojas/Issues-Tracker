import { BacklogState } from "../../types"
import { BacklogPayload } from '../../types/reducerTypes'

export const backlogStateFunc = (payload: BacklogPayload | undefined, backlogState: BacklogState) => {
  const results: BacklogState = { ...backlogState, ...payload }

  if (results.backlog) {

    results.backlog.forEach((elem) => {
      if (elem.TicketStatus) {
        //@ts-ignore
        results.numberOfTasksCards[elem.TicketStatus]++
      }
    })

    if (payload?.filteredView || results.filteredView) {
      results.filteredLog = results.backlog.filter((elem) => {
        return elem.IssueType === results.issueTypeFilter || elem.TicketStatus === results.issueTypeFilter
      })
    }
  }

  return results
}