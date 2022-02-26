<template>
  <q-page padding>
    <suspense>
      <article-async :article-id="articleId" />
    </suspense>
  </q-page>
</template>

<script setup lang="ts">
import ArticleAsync from '@/components/ArticleAsync.vue'
const { articleId } = defineProps<{
  articleId: string
}>()
</script>
