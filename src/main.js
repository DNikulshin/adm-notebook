import { createApp } from 'vue'
// import './registerServiceWorker.js'
import { router } from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
