import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const taskMap = useLocalStorage<Record<string, number>>(
  'taskMap',
  {},
  { deep: true }
)

export function doTask(id: string) {
  taskMap.value[id] = Date.now()
}

export function isTaskDone(id: string) {
  const tsn = taskMap.value[id]
  if (!tsn) return false
  const ts = new Date(taskMap.value[id] ?? 0)
  const now = new Date()
  if (id === 'predict_symptom') {
    // Once per week
    return (
      ts.getFullYear() === now.getFullYear() &&
      ts.getMonth() === now.getMonth() &&
      ts.getDate() - ts.getDay() === now.getDate() - now.getDay()
    )
  }
  if (id === 'predict_bcrl') {
    // Once per month
    if ([1, 3, 6, 12].includes(now.getMonth() + 1)) {
      return (
        ts.getFullYear() === now.getFullYear() &&
        ts.getMonth() === now.getMonth()
      )
    }
    return true
  }
  // Once a day
  return ts.toDateString() === now.toDateString()
}

export function getDoneTs(id: string) {
  return isTaskDone(id) ? taskMap.value[id] : null
}

export function taskStatus(id: string) {
  return computed(() => taskMap.value[id])
}
