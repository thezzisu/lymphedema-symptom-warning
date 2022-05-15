<template>
  <q-card>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h5">今日任务</div>
        </div>
        <div class="col-auto">
          <q-btn
            flat
            color="primary"
            :label="showDone ? '未完成的任务' : '完成的任务'"
            @click="showDone = !showDone"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row">
      <template v-if="displayTasks.length">
        <q-card
          v-for="task of displayTasks"
          bordered
          flat
          class="column items-center q-pa-sm"
          v-ripple
          @click="router.push(task.to)"
        >
          <div>
            <q-btn
              round
              color="primary"
              :icon="task.icon"
              outline
              :ripple="false"
            />
          </div>
          <div class="text-subtitle2">{{ task.name }}</div>
        </q-card>
      </template>
      <template v-else>
        <div class="col-12 row justify-center">
          <div class="col-auto">没有{{ showDone ? '' : '未' }}完成的任务！</div>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showDone = ref(false)

const tasks = [
  //
  { name: '预测发病率', icon: 'mdi-clipboard-check-outline', to: '/predict' }
]

const tasksInfo = useLocalStorage<Record<string, string>>(
  'tasksInfo',
  {},
  { deep: true }
)

const displayTasks = computed(() =>
  tasks.filter(
    (task) =>
      (tasksInfo.value[task.name] !== new Date().toDateString()) !==
      showDone.value
  )
)
</script>
