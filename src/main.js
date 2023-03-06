import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'mdb-vue-ui-kit/css/mdb.min.css'

import App from './App.vue'
import router from './router'
//import Vue3Material from 'vue3-material'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// Use Vue3Material
//app.use(Vue3Material)

app.mount('#app')
