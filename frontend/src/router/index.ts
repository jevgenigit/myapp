import { createRouter, createWebHashHistory  } from 'vue-router'
import MainPageView from '@/views/MainPageView.vue'
import LandingPage from '@/views/LandingPageView.vue';


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/main-page',
    name: 'MainPage',
    component: MainPageView,
  },
],
})

export default router
