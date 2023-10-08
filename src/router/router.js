import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/ViewCreateUser.vue')
    },
    {
        path: '/viewUsuarios',
        name: 'viewUsuarios',
        component: () => import('@/views/ViewShowUsers.vue')
    },
    {
        path: '/viewUser/:id',
        name: 'viewUser',
        component: () => import('@/views/ViewUser.vue')
    },
    {
        path: '/viewShowEdit',
        name: 'viewShowEdit',
        component: () => import('@/views/ViewShowEdit.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('@/views/ViewNotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
