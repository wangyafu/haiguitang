import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('../components/home/HomePage.vue')
    },
    {
      path: '/puzzles/:id',
      name: 'puzzle',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/puzzle/PuzzlePage.vue')
    }
    // {
    //   path:'/wordPuzzle',
    //   name:'wordPuzzle',
    //   component:()=>import('../components/wordPuzzle/WordPuzzlePage.vue')
    // }
  ]
})

export default router
