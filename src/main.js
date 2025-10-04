import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router/router";
import "element-plus/dist/index.css";
import "./assets/css/tailwind.css";
import './assets/css/app.css';

const app = createApp(App);
const pinia = createPinia();

app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount("#app");
