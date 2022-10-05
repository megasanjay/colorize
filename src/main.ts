import "./assets/main.css";
import "vue3-lottie/dist/style.css";

import { MotionPlugin } from "@vueuse/motion";
import { createPinia } from "pinia";
import { createApp } from "vue";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(MotionPlugin);
app.use(router);
app.use(Vue3Lottie);

app.provide("$umami", window.umami);

app.mount("#app");
