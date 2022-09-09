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
    <q-separator />
    <q-card-section>
      <template v-if="tasks.reduce((acc, cur) => acc + cur.length, 0)">
        <div class="text-h6 text-bold">风险预测</div>
        <div class="row">
          <div v-for="task of tasks[0]" class="col-xs-6 col-md-3 q-pa-sm">
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
              <div class="text-h6">{{ task.label }}</div>
            </q-card>
          </div>
        </div>
        <div class="text-h6 text-bold">行为管理</div>
        <div class="row">
          <div v-for="task of tasks[1]" class="col-xs-6 col-md-3 q-pa-sm">
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
              <div class="text-h6">{{ task.label }}</div>
            </q-card>
          </div>
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
  Object.entries(models).map(([id, model], i) => ({
    name: 'predict_' + id,
    label: '进行' + model.name + '预测',
    icon: ['mdi-clipboard-check-outline', 'mdi-clipboard-alert-outline'][i],
    to: '/predict/' + id,
    color: ['primary', 'accent'][i]
  })),
  Object.entries(prescriptions).map(([id, prescription]) => ({
    name: 'prescription_' + id,
    label: prescription.name,
    icon: 'mdi-walk',
    to: '/prescription/' + id,
    color: 'positive'
  }))
]
</script>
