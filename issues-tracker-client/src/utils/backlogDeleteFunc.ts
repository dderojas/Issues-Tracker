//@ts-nocheck
import { BacklogState } from "../../types"


export const backlogDeleteFunc = (payload: BacklogState | undefined, backlogState: BacklogState) => {
  const results: BacklogState = { ...backlogState, ...payload }
  
  if (results.deleteView && results?.selectedTickets.length > 0) {
    results.backlog = results.backlog?.filter((item) => !results.selectedTickets?.includes(item.TicketId))
    results.selectedTickets = [];
  }

  return results;
}

