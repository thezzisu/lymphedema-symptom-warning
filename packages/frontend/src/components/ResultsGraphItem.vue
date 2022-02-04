<template>
  <div class="column items-center">
    <div>
      <q-icon :name="icon" :color="color" size="md" />
    </div>
    <div class="text-caption" :class="[`text-${color}`]">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  classToColor,
  classToIcon,
  classToLabel,
  probToClass
} from '@/core/predict'
import { IPredictRecord } from '@/db'

const { record } = defineProps<{ record?: IPredictRecord }>()

let label = '无记录'
let color = 'grey'
let icon = 'mdi-help'
if (record) {
  const prob = record.prob
  const recordClass = probToClass(prob)
  label = classToLabel(recordClass)
  color = classToColor(recordClass)
  icon = classToIcon(recordClass)
}
</script>
