import { createApp } from 'vue'
import App from './App.vue'

import router from './router/Index'

import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App); 
app.use(router); // Gunakan router dalam aplikasi
app.mount('#app');// Hanya panggil createApp sekali

