<template>
  <q-card
    bordered
    flat
    class="column items-center q-pa-sm"
    v-ripple
    @click="router.push(task.to)"
  >
    <q-icon :color="task.color" :name="task.icon" size="xl" />
    <div class="text-h6">{{ task.label }}</div>
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
  </q-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const { task } = defineProps<{
  task: {
    to: string
    color: string
    icon: string
    label: string
    done: number | null
  }
}>()
</script>
