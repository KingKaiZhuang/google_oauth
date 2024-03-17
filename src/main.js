import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    "112385572293-6tco996tc532id3pk00o4rrve8eet6sc.apps.googleusercontent.com",
});
app.mount("#app");
