import MapViewVue from "@/views/MapView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", component: MapViewVue }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
