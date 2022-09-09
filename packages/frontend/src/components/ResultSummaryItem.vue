<template>
  <div
    class="column items-center"
    @click="router.push(`/result/${record.localId}`)"
  >
    <q-icon :name="category.icon" :color="category.color" size="xl" />
    <div>{{ category.label }}</div>
  </div>
</template>

<script setup lang="ts">
// import { prettierProb } from '@/core/utils'
import { models } from '@/core/model'
import { IPredictRecord } from '@/db'
import { useRouter } from 'vue-router'

const router = useRouter()

const { record } = defineProps<{
  record: IPredictRecord
}>()

const model = models[record.modelId]
// const probText = prettierProb(record.result[0])
const category = model.getCategory(record.result)
// const time = new Date(record.ts).toLocaleString()
</script>
