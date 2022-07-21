<template>
  <q-item clickable :to="`/result/${record.localId}`">
    <q-item-section avatar>
      <q-icon :name="resultClass.icon" :color="resultClass.color" size="md" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        结果：{{ resultClass.label }}
        <span>（{{ probText }}）</span>
      </q-item-label>
      <q-item-label>
        <q-linear-progress
          :value="record.result[0]"
          :color="resultClass.color"
        />
      </q-item-label>
      <q-item-label>评估时间：{{ time }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { prettierProb, getResultClass } from '@/core/predict'
import { IPredictRecord } from '@/db'

const { record } = defineProps<{
  record: IPredictRecord
}>()

const probText = prettierProb(record.result[0])
const resultClass = getResultClass(record.result)
const time = new Date(record.ts).toLocaleString()
</script>
