import { SprintBoardState, Item } from "../../types"

export const filterForKanban = (backlogData: Item[] | undefined): SprintBoardState => {
  
  const results: SprintBoardState = { inProgress: [], todo: [], done: [] }

  if (!backlogData || backlogData.length === 0) return results

  for (let i = 0; i < backlogData.length; i++) {
    if (backlogData[i].TicketStatus === 'In Progress') {
      results.inProgress.push(backlogData[i])
    }
    if (backlogData[i].TicketStatus === 'Todo') {
      results.todo.push(backlogData[i])
    }
    if (backlogData[i].TicketStatus === 'Done') {
      results.done.push(backlogData[i])
    }
  }

  return results;
}