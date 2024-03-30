import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/editer'
        },
        {
            path: '/editer',
            name: 'editer',
            component: () => import('./pages/editer/index.vue')
        },
        {
            path: '/preview',
            name: 'preview',
            component: () => import('./pages/preview.vue')
        }
    ]
})