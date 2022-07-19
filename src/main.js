import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMask from '@devindex/vue-mask';
createApp(App).use(router).mount('#app')
createApp(App).use(VueMask)
