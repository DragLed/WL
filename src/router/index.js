import GiftView from '@/components/GiftView.vue'
import MainComponent from '@/components/MainComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', component: MainComponent },
  { path: '/giftview/:id', component: GiftView, name: 'giftview'}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
