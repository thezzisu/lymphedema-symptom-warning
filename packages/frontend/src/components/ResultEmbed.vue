<template>
  <q-item clickable :to="`/result/${record.localId}`">
    <q-item-section avatar>
      <q-icon :name="icon" :color="color" size="md" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        结果：{{ label }}
        <span>（{{ probText }}）</span>
      </q-item-label>
      <q-item-label>
        <q-linear-progress :value="record.prob" :color="color" />
      </q-item-label>
      <q-item-label>评估时间：{{ time }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import {
  classToColor,
  classToIcon,
  classToLabel,
  prettierProb,
  probToClass
} from '@/core/predict'
import { IPredictRecord } from '@/db'

const { record } = defineProps<{
  record: IPredictRecord
}>()

const recordClass = probToClass(record.prob)
const probText = prettierProb(record.prob)
const label = classToLabel(recordClass)
const color = classToColor(recordClass)
const icon = classToIcon(recordClass)
const time = new Date(record.ts).toLocaleString()
</script>
