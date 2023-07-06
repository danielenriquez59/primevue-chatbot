import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.directive("tooltip", Tooltip);
  //other components that you need
});
