import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

const apiTodos = axios.create({
    baseURL: URL,
})

export default apiTodos;