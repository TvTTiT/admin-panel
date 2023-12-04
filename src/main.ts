import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-green/theme.css'; // theme
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown'; 
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';

const app = createApp(App);

app.use(PrimeVue);
app.component('DataView', DataView);
app.component('Dropdown', Dropdown);
app.component('Paginator', Paginator);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Card', Card);
app.component('Menubar', Menubar);

app.use(router);
app.mount('#app');
