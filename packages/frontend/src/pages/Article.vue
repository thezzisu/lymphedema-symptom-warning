<template>Article: {{ props.articleId }}</template>

<script setup lang="ts">
const props = defineProps<{
  articleId: string
}>()
</script>
