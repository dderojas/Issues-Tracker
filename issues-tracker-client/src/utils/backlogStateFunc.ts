import { BacklogState } from "../../types"

export const backlogStateFunc = (payload: BacklogState | undefined, backlogState: BacklogState) => {
  const results: BacklogState = { ...backlogState, ...payload }

  if (results.backlog) {
    if (payload?.filteredView) {
      results.filteredLog = results.backlog.filter((elem) => {
        return elem.IssueType === payload.issueTypeFilter
      })
    }
  
    if (payload?.backlog && results.filteredView) {
        results.filteredLog = results.backlog.filter((elem) => {
          return elem.IssueType === results.issueTypeFilter
        })
    }

  }


  return results
}