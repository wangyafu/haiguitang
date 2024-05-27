import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/puzzles/:id',
      name: 'puzzle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/PuzzlePage.vue')
    }
  ]
})

export default router
