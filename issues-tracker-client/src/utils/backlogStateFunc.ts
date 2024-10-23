import { BacklogState } from "../../types"
import { BacklogPayload } from '../../types/reducerTypes'
import { calculateDaysFunc } from "./calculateDays"

export const backlogStateFunc = (payload: BacklogPayload | undefined, backlogState: BacklogState) => {
  const results: BacklogState = { ...backlogState, ...payload }

  results.numberOfTasksCards = { Todo: '0', Ongoing: '0', Done: '0', Backlog: '0' }

  if (results.backlog) {

    // task number cards
    results.backlog.forEach((elem) => {
      if (elem.TicketStatus) {
        //@ts-ignore
        results.numberOfTasksCards[elem.TicketStatus]++
      }
    })

    if (payload?.filteredView || results.filteredView) {
      results.filteredLog = results.backlog.filter((elem) => {

        if (results.issueTypeFilter !== 'Due Soon') {

          return elem.IssueType === results.issueTypeFilter || elem.TicketStatus === results.issueTypeFilter
        }

        //@ts-ignore
        let { differenceInDays } = calculateDaysFunc(elem.DueDate)

        if ((!differenceInDays || differenceInDays < 2) && elem.TicketStatus !== 'Done') {

          return true
        }

        return false
      })
    }
  }

  return results
}