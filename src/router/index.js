import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/demografia',
      name: 'demografia',
      component: () => import('../views/DemografiaView.vue')
    },
    {
      path: '/edifici',
      name: 'edifici',
      component: () => import('../views/EdificiView.vue')
    },
    {
      path: '/relazioni',
      name: 'relazioni',
      component: () => import('../views/RelazioniView.vue')
    }
  ]
})

export default router
