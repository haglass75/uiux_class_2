import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Event from "@/views/Event.vue";
import About from "@/views/About.vue";
import Review from "@/views/Review.vue";
import Reserva from "@/views/Reserva.vue";
import FQ from "@/views/F&Q.vue";
import NotFoundVue from "@/views/NotFound.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductDetail },
  { path: "/event", component: Event },
  { path: "/about", component: About },
  { path: "/review", component: Review },
  { path: "/f&q", component: FQ },
  { path: "/reservation", component: Reserva },
  { path: "/:pathMatch(.*)*", name: "NotFoundVue", component: NotFoundVue },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
