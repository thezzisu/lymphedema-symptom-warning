<template>
  <q-page padding>
    <suspense>
      <articles-async />
    </suspense>
  </q-page>
</template>

<script setup lang="ts">
import ArticlesAsync from '@/components/ArticlesAsync.vue'
</script>
