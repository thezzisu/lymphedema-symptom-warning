<template>
  <q-card>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h5">任务列表</div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h6 text-bold">风险预测</div>
      <div class="row">
        <div v-for="task of tasks[0]" class="col-xs-6 col-md-3 q-pa-sm">
          <task-item :task="task" />
        </div>
      </div>
      <div class="text-h6 text-bold">行为管理</div>
      <div class="row">
        <div v-for="task of tasks[1]" class="col-xs-6 col-md-3 q-pa-sm">
          <task-item :task="task" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import { models } from '@/core/model'
import { prescriptions } from '@/core/prescription'
import { getDoneTs } from '@/core/task'

const tasks = [
  Object.entries(models).map(([id, model], i) => ({
    name: 'predict_' + id,
    label: '进行' + model.name,
    icon: ['mdi-clipboard-check-outline', 'mdi-clipboard-alert-outline'][i],
    to: '/predict/' + id,
    color: ['primary', 'accent'][i],
    done: getDoneTs('predict_' + id)
  })),
  Object.entries(prescriptions).map(([id, prescription]) => ({
    name: 'prescription_' + id,
    label: prescription.name,
    icon: 'mdi-walk',
    to: '/prescription/' + id,
    color: 'amber',
    done: getDoneTs('prescription_' + id)
  }))
]
</script>
