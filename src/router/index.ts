import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '../views/StartScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartScreen,
    },
    {
      path: '/frame',
      name: 'frame',
      component: () => import('../views/FrameView.vue'),
    },
  ],
})

export default router
