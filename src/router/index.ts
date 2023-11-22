import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import BlogViewVue from '@/views/BlogView.vue'

import { storeToRefs } from 'pinia'
import { useMainStore } from "@/stores/main";


function checkIfLogged() {
  const mainStore = useMainStore();
  const { token } = storeToRefs(mainStore)
  if (!token.value) return '/login';
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogViewVue,
      beforeEnter: [checkIfLogged],
    },
    {
      path: '/filter',
      name: 'filter',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilterView.vue'),
      beforeEnter: [checkIfLogged],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogViewVue,
      beforeEnter: [checkIfLogged],
    },
  ]
})

export default router
