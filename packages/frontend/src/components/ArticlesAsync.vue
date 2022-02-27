<template>
  <div class="row justify-center" v-for="(article, i) in articles" :key="i">
    <div class="col-12">
      <q-card
        v-ripple
        class="q-hoverable cursor-pointer"
        @click="gotoArticle(article.id)"
      >
        <div tabindex="-1" class="q-focus-helper"></div>
        <q-img :src="article.cover">
          <div class="absolute-bottom text-h6">{{ article.title }}</div>
        </q-img>
        <q-card-section v-if="article.summary">
          {{ article.summary }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticles } from '@/core/articles'
import { useRouter } from 'vue-router'

const articles = await getArticles()
const router = useRouter()

function gotoArticle(articleId: string) {
  router.push({ name: 'article', params: { articleId } })
}
</script>
