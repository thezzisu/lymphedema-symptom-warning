import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export const taskMap = useLocalStorage<Record<string, string>>(
  'taskMap',
  {},
  { deep: true }
)

function getTimestamp() {
  return new Date().toDateString()
}

export function doTask(id: string) {
  taskMap.value[id] = getTimestamp()
}

export function isTaskDone(id: string) {
  return taskMap.value[id] === getTimestamp()
}

export function taskStatus(id: string) {
  return computed(() => taskMap.value[id])
}
