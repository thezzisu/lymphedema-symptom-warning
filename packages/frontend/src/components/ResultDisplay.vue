<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">预测结果</div>
      <div>注意：结果仅供参考</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-h6">发病概率</div>
      <q-linear-progress
        size="50px"
        :value="record.prob"
        :color="resultColor"
        class="q-mt-sm"
      >
        <div class="absolute-full flex flex-center">
          <q-badge
            color="white"
            :text-color="resultColor"
            :label="recordLabel"
          />
        </div>
      </q-linear-progress>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="text-h6">建议</div>
      <div>{{ resultSuggestion }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {
  classToColor,
  classToLabel,
  classToSuggestion,
  probToClass
} from '@/core/predict'
import { IPredictRecord } from '@/db'

const { record } = defineProps<{
  record: IPredictRecord
}>()

const recordClass = probToClass(record.prob)
const recordLabel = classToLabel(recordClass)
const resultColor = classToColor(recordClass)
const resultSuggestion = classToSuggestion(recordClass)
</script>
