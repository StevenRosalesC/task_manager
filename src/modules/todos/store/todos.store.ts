import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Todo } from '../types/index';
import apiTodos from '../../../api/apiTodos';
import { calculateNumberPages } from '../../../helpers/index';
import { useGlobalStore } from '../../../store/global.store';


export const useTodosStore = defineStore('todosStore', () => {
    const {isLoading} = storeToRefs(useGlobalStore())


    const todos = ref<Todo[]>([])

    // pagination to table
    const currentPage = ref(1);
    const perPage = ref(5);
    const totalTodos = ref(0);
    const totalPages = ref(0);
    const getTodos = async () => {
        isLoading.value = true
        //todos/?page=1&limit=10
        await apiTodos.get(`/todos/?page=${currentPage.value}&limit=${perPage.value}`
        ).
            then((res) => {
                todos.value = res.data.todos,
                totalTodos.value = res.data.totalTodos,
                totalPages.value = calculateNumberPages(totalTodos.value, perPage.value)
                isLoading.value = false
            }).
            catch((err) => {
                console.log(err)
            })

    }
    const addTask = async (todo: Todo) => {
        await apiTodos.post('/todos', todo).
            then((res) => {
                // todos.value = [...todos.value, res.data.todo]
                if (todos.value.length < perPage.value) {
                    todos.value = [...todos.value, res.data.todo]
                }
                // get todos again
                getTodos()

            }).
            catch((err) => {
                console.log(err)
            })
    }

    const removeTask = (id: string) => {
        apiTodos.delete(`/todos/${id}`).
            then((res) => {
                todos.value = todos.value.filter((todo) => todo.id_todo !== res.data.todo.id_todo)
                // get todos again
                getTodos()
            }).
            catch((err) => {
                console.log(err)
            })
    }

    // navigation to table
    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
            getTodos()
        }
    }
    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
            getTodos()
        }
    }

    const goToPage = (page: number) => {
        currentPage.value = page
        getTodos()
    }








    getTodos()
    return {
        todos,
        addTask,
        removeTask,
        currentPage,
        perPage,
        totalTodos,
        totalPages,
        nextPage,
        prevPage,
        goToPage
    }
})