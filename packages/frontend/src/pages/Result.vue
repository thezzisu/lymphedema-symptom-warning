<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <suspense>
          <result-async :result-id="parseInt(resultId)" />
        </suspense>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ResultAsync from '@/components/ResultAsync.vue'

const { resultId } = defineProps<{
  resultId: string
}>()
</script>
