import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/course', name: 'course', component: () => import('../components/CourseView.vue') },
    { path: '/workshop', name: 'workshop', component: () => import('../components/WorkshopView.vue') },
    { path: '/blog', name: 'blog', component: () => import('../components/BlogView.vue') },
    { path: '/contact', name: 'contact', component: () => import('../components/ContactView.vue') },
    { path: '/admin', name: 'admin', component: () => import('../components/AdminView.vue') }
  ]
})

export default router
