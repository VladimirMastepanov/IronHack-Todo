import { createApp } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import { i18n } from "./i18n";
import ripple from "./directives/v-ripple";
import vRipple from "./directives/vRipple";

const app = createApp(App);
app.directive("ripple", vRipple);
app.use(i18n);
app.mount("#app");
