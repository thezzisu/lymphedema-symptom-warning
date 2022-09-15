<template>
  <q-item bordered flat clickable @click="onClick">
    <q-item-section avatar>
      <q-icon :color="task.color" :name="task.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ task.label }}</q-item-label>
      <q-item-label caption>
        <q-chip
          :color="task.done ? 'positive' : 'negative'"
          size="md"
          text-color="white"
          dense
        >
          {{
            task.done
              ? `在${new Date(task.done).toLocaleDateString()}完成`
              : '未完成'
          }}
        </q-chip>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import { doTask } from '@/core/task'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const { task } = defineProps<{
  task: {
    name: string
    to?: string
    color: string
    icon: string
    label: string
    done: number | null
  }
}>()
const emit = defineEmits<{
  (event: 'done'): void
}>()

function onClick() {
  if (task.to) {
    router.push(task.to)
  } else {
    $q.dialog({
      title: '任务完成',
      message: `您已完成${task.label}任务！`,
      ok: {
        label: '好的'
      },
      persistent: true
    })
    doTask(task.name)
    emit('done')
  }
}
</script>
