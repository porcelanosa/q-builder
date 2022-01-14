import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import * as path from "path";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    },
    {
        path: '/quizzes',
        name: 'quizzes',
        component: () => import(/* webpackChunkName: "register" */ '../views/Quizzes.vue'),
    },
    {
        path: '/quiz/:id',
        name: 'quiz',
        component: () => import(/* webpackChunkName: "quiz" */ '../views/Quiz.vue'),
        children: [
            {
                path: 'edit',
                name: 'editQuiz',
                component:() => import(/* webpackChunkName: "quiz" */ '../views/Quiz.vue'),
            }
        ]
    },
    {
        path: '/quiz/create',
        name: 'createQuiz',
        component: () => import(/* webpackChunkName: "quiz" */ '../views/Quiz.vue')
    },
    {
        path: '/sign-in',
        name: 'signin',
        component: () => import(/* webpackChunkName: "signin" */ '../views/SignIn.vue'),
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/:catchAll(.*)",
        component: () =>
            import(/* webpackChunkName: "not-found" */ "../views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
