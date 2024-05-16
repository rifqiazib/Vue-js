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
    },
    {
        'path' : '/vehicle',
        'name' : 'vehicle',
        component : () => import ('@/views/vehicle/IndexVehicle.vue')
    },
    {
        'path' : '/vehicle/create',
        'name' : 'create.vehicle',
        component : () => import ('@/views/vehicle/CreateVehicle.vue')
    },
    {
        'path' : '/vehicle/:id',
        'name' : 'edit.vehicle',
        component : () => import ('@/views/vehicle/EditVehicle.vue')
    }
];

const router  = createRouter({
    history : createWebHistory(),
    routes
});

export default router;

