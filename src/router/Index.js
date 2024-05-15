import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {   
        'path' : '/login',
        'name' : 'login',
        component : () => import ('@/views/auth/LoginUser.vue')
    },
    {
        'path' : '/register',
        'name' : 'register',
        component : () => import ('@/views/auth/RegisterUser.vue')
    },
    {
        'path' : '/dashboard',
        'name' : 'dashboard',
        component : () => import ('@/views/dashboard/IndexUser.vue')
    }
];

const router  = createRouter({
    history : createWebHistory(),
    routes
});

export default router;

