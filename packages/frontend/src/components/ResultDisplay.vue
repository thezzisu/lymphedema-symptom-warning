<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">评估结果</div>
      <div>注意：结果仅供参考</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div>评估时间：{{ time }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-h6">发病概率</div>
      <q-linear-progress
        size="50px"
        :value="record.prob"
        :color="color"
        class="q-mt-sm"
      >
        <div class="absolute-full flex flex-center">
          <q-badge color="white" :text-color="color" :label="label" />
        </div>
      </q-linear-progress>
      <div>预测概率：{{ probText }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-h6">建议</div>
      <div>{{ suggestion }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions align="right">
      <q-btn
        color="negative"
        label="删除该记录"
        :loading="removeLoading"
        @click="removeRun"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useAsyncTask } from '@/composables/async'
import {
  classToColor,
  classToLabel,
  classToSuggestion,
  prettierProb,
  probToClass
} from '@/core/predict'
import { useConfirm } from '@/core/utils'
import { IPredictRecord, removePredictRecord } from '@/db'
import { useQuasar } from 'quasar'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const { record } = defineProps<{
  record: IPredictRecord
}>()

const recordClass = probToClass(record.prob)
const probText = prettierProb(record.prob)
const label = classToLabel(recordClass)
const color = classToColor(recordClass)
const suggestion = classToSuggestion(recordClass)
const time = new Date(record.ts).toLocaleString()

const confirm = useConfirm()
const router = useRouter()
const $q = useQuasar()

const { run: removeRun, loading: removeLoading } = useAsyncTask(async () => {
  await confirm('是否删除该记录？', '该操作无法撤销！')
  await removePredictRecord(record.localId)
  $q.notify({
    color: 'positive',
    message: '删除成功'
  })
  nextTick(() => router.replace(`/`))
})
</script>
