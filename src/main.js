import 'bootstrap';
import 'bootstrap/dist/css/boostrap.min.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
