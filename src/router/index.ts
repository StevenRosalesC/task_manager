import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "../layout/AppLayout.vue";
import { todosRoutes } from '../modules/todos/routes/index';


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/todos',
            name: 'todos',
            component: AppLayout,
            children: [
                {
                    ...todosRoutes,
                }
            ]
        }
    ]
})

export default router;