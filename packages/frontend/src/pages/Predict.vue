<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h5">发病率预测</div>
            <div>请按照您最近的真实情况作答，以提高预测结果的可靠性</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section v-for="(value, key, i) of variables" :key="i">
            <div>{{ value.text }}</div>
            <div class="q-gutter-sm">
              <q-radio v-model="result[key]" :val="1" label="有" />
              <q-radio v-model="result[key]" :val="0" label="无" />
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-actions>
            <div class="col-12 column">
              <q-btn
                color="primary"
                label="预测"
                :loading="predictLoading"
                @click="predictRun"
              >
              </q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAsyncTask } from '@/composables/async'
import { Answer, predict, variables } from '@/core/predict'
import { addPredictRecord } from '@/db'
import { useLocalStorage } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { nextTick, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const $router = useRouter()

const result = ref<Answer>(
  Object.fromEntries(Object.entries(variables).map(([key]) => [key, 0])) as any
)

const tasksInfo = useLocalStorage<Record<string, string>>(
  'tasksInfo',
  {},
  { deep: true }
)

const { loading: predictLoading, run: predictRun } = useAsyncTask(async () => {
  const answer = toRaw(result.value)
  const prob = await predict(answer)
  const resultId = await addPredictRecord(prob, +new Date(), answer)
  if (tasksInfo.value['预测发病率'] !== new Date().toDateString()) {
    $q.dialog({
      title: '任务完成',
      message: '您已完成预测发病率任务！',
      ok: {
        label: '查看结果'
      },
      persistent: true
    }).onOk(() => {
      $router.push({ name: 'result', params: { resultId } })
    })
    tasksInfo.value['预测发病率'] = new Date().toDateString()
    console.log('12345')
  } else {
    nextTick(() => $router.push({ name: 'result', params: { resultId } }))
  }
  $q.notify({
    color: 'positive',
    message: '预测结果已保存',
    timeout: 2000
  })
})
</script>
