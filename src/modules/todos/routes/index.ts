import { RouteRecordRaw } from 'vue-router'
export const todosRoutes: RouteRecordRaw = {
    path: '/todos',
    name: 'todos',
    component:() => import('../layouts/todos.layout.vue'),
    children: [
        {
            path: '',
            name: 'todos-list',
            component: () => import('../pages/Todos.page.vue')
        }
    ]
}