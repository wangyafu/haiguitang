import './assets/main.css'
import CommonHeader from './components/CommonHeader.vue'
import Login from './components/Login.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.component('CommonHeader', CommonHeader)
app.component('Login', Login)
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
