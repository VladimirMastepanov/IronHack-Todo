import { createApp } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import { i18n } from "./i18n";
import vRipple from "./directives/vRipple";
import { createPinia } from "pinia";

const app = createApp(App);
app.directive("ripple", vRipple);
app.use(i18n);
app.use(createPinia());
app.mount("#app");
