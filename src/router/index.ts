import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import BlogViewVue from '@/views/BlogView.vue'
import HelloWorld from '@/components/HelloWorld.vue'

import { storeToRefs } from 'pinia'
import { useMainStore } from "@/stores/main";


function checkIfLogged() {
  const mainStore = useMainStore();
  const { token } = storeToRefs(mainStore)
  console.log('checkIfLogged', token.value)
  if (!token.value) return '/login';
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
  ]
})

export default router
