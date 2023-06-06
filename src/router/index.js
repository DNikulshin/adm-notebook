import {createRouter, createWebHashHistory} from 'vue-router'
import App from '../src/App.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', name: 'App', component: App}
    ]
})
