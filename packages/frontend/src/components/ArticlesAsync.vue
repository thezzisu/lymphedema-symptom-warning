<template>
  <div class="row justify-center" v-for="(article, i) in articles" :key="i">
    <div class="col-sm-12 col-md-8 col-lg-4 q-pb-md">
      <q-card
        v-ripple
        class="q-hoverable cursor-pointer"
        @click="gotoArticle(article.id)"
      >
        <div tabindex="-1" class="q-focus-helper"></div>
        <q-img :src="article.cover">
          <div class="absolute-bottom text-h6">{{ article.title }}</div>
        </q-img>
        <q-card-section>
          {{ article.summary }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticles } from '@/core/api'
import { useRouter } from 'vue-router'

const articles = await getArticles()
const router = useRouter()

function gotoArticle(articleId: string) {
  router.push({ name: 'article', params: { articleId } })
}
</script>
