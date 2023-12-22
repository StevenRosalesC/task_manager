<template>
    <!-- Main modal -->
    <div v-if="showModal" id="static-modal" data-modal-backdrop="static" tabindex="-1"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center">
        <!-- Modal overlay -->
        <div class="w-full h-full bg-gray-100 opacity-80 absolute"></div>

        <!-- Modal content -->
        <div class="relative p-4 w-full max-w-2xl max-h-full z-10">
            <div class="bg-white rounded-lg shadow flex flex-col dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Editar tarea
                    </h3>
                    <button @click="hideModal" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="static-modal">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tarea
                        </label>
                        <input type="text" id="name" v-model="taskEdit.name"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="flex flex-col">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Descripción
                        </label>
                        <input type="text" id="description" v-model="taskEdit.description"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="flex flex-col">
                        <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Hora Limite
                        </label>
                        <input type="time" v-model="taskEdit.limit_time" id="time"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div class="flex flex-col">
                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Fecha Limite
                        </label>
                        <input type="date" id="date" v-model="taskEdit.limit_date" class="block w-full
                            p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs
                            focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500" />
                    </div>
                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                            <input id="remember" type="checkbox" v-model="taskEdit.done_task"
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                required>
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Completado
                        </label>
                    </div>

                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="static-modal" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Guardar
                    </button>
                    <button data-modal-hide="static-modal" type="button"
                        class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        @click="hideModal">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Todo } from '../types';
defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
    taskEdit: {
        type: Object as () => Todo,
        required: true,
    }
})

const emits = defineEmits({
    'change-showModal': (value: boolean) => typeof value === 'boolean',
})

const hideModal = () => {
    emits('change-showModal', false)
}
</script>

<style scoped></style>