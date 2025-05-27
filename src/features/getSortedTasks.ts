import type { SortType, TaskDescription } from '../types/types'

export const getSortedTasks = (tasks: TaskDescription[], sortBy: SortType) => {
  if (sortBy === 'none') return tasks
  return [...tasks].sort((a, b) => {
    if (sortBy === 'text') return a.text.localeCompare(b.text)
    if (sortBy === 'importance') return a.importance - b.importance
    if (sortBy === 'status') return Number(a.isDone) - Number(b.isDone)
    return 0
  })
}
