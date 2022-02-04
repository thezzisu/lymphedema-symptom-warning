<template>
  <result-display :record="record" />
</template>

<script setup lang="ts">
import { getPredictRecord } from '@/db'
import ResultDisplay from './ResultDisplay.vue'

const { resultId } = defineProps<{
  resultId: number
}>()

const record = await getPredictRecord(resultId)
</script>
