import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Index.vue')
    },
    {
      path: '/predict',
      component: () => import('@/pages/Predict.vue')
    },
    {
      path: '/articles',
      component: () => import('@/pages/Articles.vue')
    },
    {
      path: '/articles/:articleId',
      component: () => import('@/pages/Article.vue'),
      props: true
    },
    {
      path: '/account',
      component: () => import('@/pages/Account.vue')
    }
  ]
})

export default router
