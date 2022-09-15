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
          <q-card-section v-for="(param, i) of parameters" :key="i">
            <div>{{ param.label }}</div>
            <div class="q-gutter-sm">
              <q-radio
                v-for="(option, j) of param.options"
                :key="j"
                v-model="input[i]"
                :val="option[1]"
                :label="option[0]"
              />
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
import { addRecord, apiUser, isLoggedIn } from '@/api'
import { useAsyncTask } from '@/composables/async'
import { Answer, models } from '@/core/model'
import { taskMap, doTask, isTaskDone } from '@/core/task'
import { addPredictRecord } from '@/db'
import { useQuasar } from 'quasar'
import { nextTick, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'

const { modelId } = defineProps<{
  modelId: string
}>()

const model = models[modelId]

const $q = useQuasar()
const $router = useRouter()

const parameters = model.getParameters()
const input = ref<Answer>(parameters.map(() => 0))

const { loading: predictLoading, run: predictRun } = useAsyncTask(async () => {
  const answer = toRaw(input.value)
  const result = model.predict(answer)
  const recordId = await addPredictRecord(modelId, answer, result)
  if (isLoggedIn.value && modelId === 'bcrl') {
    // 风险预测，计算危险级别
    const isHighRisk = model.getCategory(result).label === '高危'
    apiUser.value.isHighRisk = isHighRisk
  }
  try {
    isLoggedIn.value && (await addRecord(recordId))
    $q.notify({
      color: 'positive',
      message: '预测结果已保存',
      timeout: 2000
    })
  } catch {
    $q.notify({
      color: 'negative',
      message: '预测结果上传失败',
      timeout: 2000
    })
  }

  const taskName = 'predict_' + modelId
  if (!isTaskDone(taskName)) {
    $q.dialog({
      title: '任务完成',
      message: `您已完成${model.name}预测任务！`,
      ok: {
        label: '查看结果'
      },
      persistent: true
    }).onOk(() => {
      $router.push({ name: 'result', params: { resultId: recordId } })
    })
    doTask(taskName)
  } else {
    nextTick(() =>
      $router.push({ name: 'result', params: { resultId: recordId } })
    )
  }
})
</script>
