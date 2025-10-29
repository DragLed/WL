import GiftView from '@/components/gift/GiftView.vue'
import MainComponent from '@/components/MainComponent.vue'
import LoginComponent from '@/components/user/LoginComponent.vue'
import RegComponent from '@/components/user/RegComponent.vue'
import UserViewComponent from '@/components/user/UserViewComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', component: MainComponent },
  { path: '/giftview/:id', component: GiftView, name: 'giftview'},
  { path: '/login', component: LoginComponent},
  { path: '/registerUser', component: RegComponent},
  { path: '/user/:id', component: UserViewComponent, id: 'user'}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
