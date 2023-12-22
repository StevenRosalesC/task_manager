import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// styles
import './style.css'

// routes 
import router from './router'

// store
const pinia = createPinia()


const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')