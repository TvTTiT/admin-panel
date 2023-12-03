// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-green/theme.css'; // theme
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dataview';
const app = createApp(App);

app.use(PrimeVue);
app.component('DataView', DataView); 
app.component('Dropdown', Dropdown); 
app.use(router);
app.mount('#app');
