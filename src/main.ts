import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { Quasar } from "quasar";
import PhosphorIcons from "@phosphor-icons/vue";

import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";
import quasarLang from "quasar/lang/pt-BR";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
});
app.use(createPinia());
app.use(router);
app.use(PhosphorIcons);
app.mount("#app");
