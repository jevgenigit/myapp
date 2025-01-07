import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './assets/texts/i18n';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
