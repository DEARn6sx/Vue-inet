import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  }, 
  {
    path: '/',
    name: 'Toolbar',
    component: () => import('../views/ToolbarView.vue'),
    children: [  
        {
          path: '/',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/simple',
          name: 'simple',
          component: () => import('../views/SimpleView.vue')
        },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
