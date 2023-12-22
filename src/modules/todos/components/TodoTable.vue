<template>
    <p class="text-center font-bold">Tareas</p>
    <div class="flex">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Tarea
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Descripción
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha Limite
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Hora Limite
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Completado
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        v-for="(task, index) in todos" :key="index">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ task.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ task.description }}
                        </td>
                        <td class="px-6 py-4">
                            {{ task.limit_date }}
                        </td>
                        <td class="px-6 py-4">
                            {{ task.limit_time }}
                        </td>
                        <td class="px-6 py-4">
                            <input type="checkbox" disabled class="form-checkbox h-5 w-5 text-blue-600"  :checked="task.done_task === 1 ? true:false">
                        </td>
                        <td class="px-6 py-4">
                            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                @click="editTask(task)"
                            >Editar</button>
                            <button class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                @click="deleteTask(task.id_todo)">Eliminar</button>
                        </td>
                    </tr>

                </tbody>
            </table>
            <nav class="flex items-center justify-center py-2">
                <ul class="inline-flex -space-x-px text-sm">
                    <li>
                        <button
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            @click="prevPage">Anterior</button>
                    </li>
                    <li v-for="(item, index) in totalPages" :key="index">
                        <button :class="currentPage === item ? 'bg-blue-200 text-blue-800' : 'bg-white'"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            @click="goToPage(item)">{{ item }}</button>
                    </li>
                    <li>
                        <button
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            @click="nextPage">Siguiente</button>
                    </li>
                </ul>
            </nav>

        </div>

    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Todo } from '../types/index';
defineProps({
    todos: {
        type: Array as () => Todo[],
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});
// make emits for navigation in the table

const emits = defineEmits({
    'next-page': () => true,
    'prev-page': () => true,
    'go-to-page': (page: number) => typeof page === 'number',
    'remove-task': (id: string) => typeof id === 'string',
    'edit-task': (task: Todo) => typeof task === 'object',
})

const deleteTask = (id: string | any) => {
    emits('remove-task', id);
}


const nextPage = () => {
    emits('next-page');
}

const prevPage = () => {
    emits('prev-page');
}

const goToPage = (page: number ) => {
    emits('go-to-page', page);
}

const editTask = (task: Todo) => {
    emits('edit-task', task);
}


</script>

<style scoped></style>