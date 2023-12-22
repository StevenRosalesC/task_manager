<template>
    <p class="text-center font-bold text-xl">
        Lista de tareas
    </p>
    <section class="flex gap-2 flex-col lg:flex-row">
        <div class="basis-2/4 border rounded-xl px-2 shadow-sm py-2">
            <p class="text-center font-medium ">Añadir tarea</p>
            <div class="flexcol">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tarea</label>
                <input type="text" id="name" v-model="newTask.name"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <label for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                <input type="text" id="description" v-model="newTask.description"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora Limite</label>
                <input type="time" v-model="newTask.limit_time" id="time"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Limite</label>
                <input type="date" id="date" v-model="newTask.limit_date"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <button @click="addNewTask"
                    class="block w-full p-2 mt-2 text-white bg-blue-500 rounded-lg sm:text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">Añadir</button>
            </div>

        </div>
        <div class="basis-2/4 border rounded-xl py-2 px-2 w-full">
            <TodoTable 
            :todos="todos" :current-page="currentPage" :total-pages="totalPages"
            @edit-task="editTask($event)"
            @go-to-page="goToPage($event)" @prev-page="prevPage" @next-page="nextPage" @remove-task="deleteTask($event)"
            />
        </div>
    </section>
    <Transition>
        <ModalEditTodo v-if="showModal" :show-modal="showModal" @change-show-modal="changeShowModal" :task-edit="taskEdit"/>
    </Transition>
</template>

<script setup lang="ts">
import TodoTable from '../components/TodoTable.vue';
import ModalEditTodo from '../components/ModalEditTodo.vue';

import { storeToRefs } from 'pinia';
import { useTodosStore } from '../store/todos.store';
import { Todo } from '../types/index';
import { ref } from 'vue';

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);
currentDate.setHours(currentDate.getHours() + 2);
const taskEdit = ref<Todo>({
    name: '',
    description: '',
    done_task: 0,
    limit_time: '',
    limit_date: ''
});

const formattedDate = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(currentDate).split('/').reverse().join('-');

const formattedTime = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false, 
}).format(currentDate);


const {
    addTask,
    removeTask,
    nextPage,
    prevPage,
    goToPage,
} = useTodosStore();
const {
    todos,
    currentPage,
    totalPages,
} = storeToRefs(useTodosStore());

const newTask = ref<Todo>(
    {
        name: '',
        description: '',
        done_task: 0,
        limit_time: formattedTime,
        limit_date: formattedDate
    }
);

const addNewTask = () => {
    addTask(newTask.value);
    newTask.value = {
        name: '',
        description: '',
        done_task: 0,
        limit_time: '',
        limit_date: ''
    };
};

const deleteTask = (id: any) => {
    // obtener el id del elemento
    removeTask(id as string);
};

const showModal = ref(false);

const changeShowModal = () => {
    showModal.value = !showModal.value;
};

const editTask = (task: Todo) => {
    taskEdit.value = task;
    changeShowModal();
};


</script>

<style scoped></style>