import { apiUser } from '@/api'
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
    if(apiUser.value.isHighRisk) {
      // Once per week if high risk
      return (
        ts.getFullYear() === now.getFullYear() &&
        ts.getMonth() === now.getMonth() &&
        ts.getDate() - ts.getDay() === now.getDate() - now.getDay()
      )
    }else{
      // Once per month
      return (
        ts.getFullYear() === now.getFullYear() &&
        ts.getMonth() === now.getMonth()
      )
    }
  }
  if (id === 'predict_bcrl') {
    // Once
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
