<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 q-pa-sm">
        <suspense>
          <results-async />
        </suspense>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ResultsAsync from '@/components/ResultsAsync.vue'
</script>
