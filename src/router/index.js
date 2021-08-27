import { createRouter, createWebHistory} from 'vue-router';
import login from './login'

const routes = [{
        path: '/',
        redirect: '/login'
    },
    login
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router