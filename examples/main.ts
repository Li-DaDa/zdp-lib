import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import App from './app.vue'
import router from './router';
import DemoBlock from './components/demo-block.vue';
import NavRight from './components/nav-right.vue';

import 'highlight.js/styles/color-brewer.css';
import 'element-plus/dist/index.css';
import './assets/styles/index.scss'

console.log(App)

const app = createApp(App)
app.use(router)

app.component('DemoBlock', DemoBlock);
app.component('NavRight', NavRight);
app.use(ElementPlus);

app.mount('#app');
