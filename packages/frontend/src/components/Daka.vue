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
      <q-separator />
      <q-list>
        <task-item v-for="task of tasks[0]" :task="task" />
      </q-list>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h6 text-bold">基础预防管理</div>
      <div>
        请先在<b>知识</b>分区学习<b>基础预防管理</b>分类下的文章，再完成下列预防任务。
      </div>
      <q-separator />
      <q-list>
        <task-item v-for="task of tasks[1]" :task="task" @done="update" />
      </q-list>
    </q-card-section>
    <template v-if="apiUser.isHighRisk">
      <q-separator />
      <q-card-section>
        <div class="text-h6 text-bold">高危预防管理</div>
        <div>
          请先在<b>知识</b>分区学习<b>高危预防管理</b>分类下的文章，再完成下列预防任务。
        </div>
        <q-separator />
        <q-list>
          <task-item v-for="task of tasks[2]" :task="task" @done="update" />
        </q-list>
      </q-card-section>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { apiUser } from '@/api'
import TaskItem from '@/components/TaskItem.vue'
import { models } from '@/core/model'
import { getDoneTs } from '@/core/task'
import { ref } from 'vue'

function generateTasks() {
  return [
    Object.entries(models).map(([id, model], i) => ({
      name: 'predict_' + id,
      label: '进行' + model.name,
      icon: ['mdi-clipboard-check-outline', 'mdi-clipboard-alert-outline'][i],
      to: '/predict/' + id,
      color: ['primary', 'accent'][i],
      done: getDoneTs('predict_' + id)
    })),
    [
      '定期自我监测',
      '坚持功能锻炼',
      '注意患肢保护',
      '做好皮肤护理',
      '生活方式管理'
    ].map((name, id) => ({
      name: 'common_' + id,
      label: name,
      icon: 'mdi-walk',
      color: 'amber',
      done: getDoneTs('common_' + id)
    })),
    ['淋巴回流操', '手法淋巴引流', '佩戴弹力袖套'].map((name, id) => ({
      name: 'highrisk_' + id,
      label: name,
      icon: 'mdi-walk',
      color: 'amber',
      done: getDoneTs('highrisk_' + id)
    }))
  ]
}

const tasks = ref(generateTasks())

function update() {
  tasks.value = generateTasks()
}
</script>
