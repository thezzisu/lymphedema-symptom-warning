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
        <div v-for="task of displayTasks" class="col-xs-6 col-md-3 q-pa-sm">
          <q-card
            bordered
            flat
            class="column items-center q-pa-sm"
            v-ripple
            @click="router.push(task.to)"
          >
            <div>
              <q-btn
                round
                :color="task.color"
                :icon="task.icon"
                outline
                :ripple="false"
              />
            </div>
            <div class="text-subtitle2">{{ task.label }}</div>
          </q-card>
        </div>
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
import { models } from '@/core/model'
import { prescriptions } from '@/core/prescription'
import { isTaskDone } from '@/core/task'

const router = useRouter()

const showDone = ref(false)

const tasks = [
  ...Object.entries(models).map(([id, model]) => ({
    name: 'predict_' + id,
    label: '进行' + model.name + '预测',
    icon: 'mdi-clipboard-check-outline',
    to: '/predict/' + id,
    color: 'primary'
  })),
  ...Object.entries(prescriptions).map(([id, prescription]) => ({
    name: 'prescription_' + id,
    label: prescription.name,
    icon: 'mdi-walk',
    to: '/prescription/' + id,
    color: 'positive'
  }))
]

const displayTasks = computed(() =>
  tasks.filter((task) => isTaskDone(task.name) === showDone.value)
)
</script>
