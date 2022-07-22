<template>
  <q-item clickable :to="`/result/${record.localId}`">
    <q-item-section avatar>
      <q-icon :name="category.icon" :color="category.color" size="md" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{ model.name }}结果：{{ category.label }}
        <span>（{{ probText }}）</span>
      </q-item-label>
      <q-item-label>
        <q-linear-progress :value="record.result[0]" :color="category.color" />
      </q-item-label>
      <q-item-label>评估时间：{{ time }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { prettierProb } from '@/core/utils'
import { models } from '@/core/model'
import { IPredictRecord } from '@/db'

const { record } = defineProps<{
  record: IPredictRecord
}>()

const model = models[record.modelId]
const probText = prettierProb(record.result[0])
const category = model.getCategory(record.result)
const time = new Date(record.ts).toLocaleString()
</script>
