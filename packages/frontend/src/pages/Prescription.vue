<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h5">行为建议：{{ prescription.name }}</div>
            <div>{{ prescription.description }}</div>
          </q-card-section>
          <q-separator inset />
          <q-card-actions>
            <div class="col-12 column">
              <q-btn
                color="primary"
                :label="finished ? '已完成' : '完成'"
                :disable="finished"
                @click="done"
              />
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { prescriptions } from '@/core/prescription'
import { doTask, isTaskDone } from '@/core/task'
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const $router = useRouter()

const { prescriptionId } = defineProps<{
  prescriptionId: string
}>()

const prescription = prescriptions[prescriptionId]

const taskName = 'prescription_' + prescriptionId
const finished = computed(() => isTaskDone(taskName))
function done() {
  $q.dialog({
    title: '任务完成',
    message: `您已完成${prescription.name}任务！`,
    ok: {
      label: '返回首页'
    },
    persistent: true
  }).onOk(() => {
    $router.push({ name: 'index' })
  })
  doTask(taskName)
}
</script>
