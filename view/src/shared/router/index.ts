import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/app/home/home.vue')
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('@/app/shortened-url/shortened-url.vue')
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import('@/shared/components/not-found/not-found.vue')
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

export default router;
