import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import { createPinia } from "pinia";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    "112385572293-6tco996tc532id3pk00o4rrve8eet6sc.apps.googleusercontent.com",
});
app.use(pinia);
app.mount("#app");

// 將 pinia 掛載到 window 上，以便在開發者工具中訪問
window.pinia = pinia;
