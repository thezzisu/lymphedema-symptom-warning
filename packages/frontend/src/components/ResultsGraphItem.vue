<template>
  <div class="column items-center">
    <div>
      <q-icon :name="icon" :color="color" size="md" />
    </div>
    <div class="text-caption" :class="[`text-${color}`]">
      {{ label }}
    </div>
    <div class="text-caption" :class="[`text-${color}`]">
      {{ probText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { prettierProb, getResultClass } from '@/core/predict'
import { IPredictRecord } from '@/db'

const { record } = defineProps<{ record?: IPredictRecord }>()

let label = '无记录'
let color = 'grey'
let icon = 'mdi-help'
let probText = '-'
if (record) {
  const prob = record.result[0]
  probText = prettierProb(prob)
  const resultClass = getResultClass(record.result)
  label = resultClass.label
  color = resultClass.color
  icon = resultClass.icon
}
</script>
