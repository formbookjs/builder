import Vue from 'vue';
import VueRouter, {Route, RouterOptions} from 'vue-router';
import Home from '../views/Home.vue';
import Form from "@/store/models/Form";

Vue.use(VueRouter);

const routeOptions: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home
      },
    },
    {
      path: '/form/:formId',
      name: 'Form',
      components: {
        default: () => import(/* webpackChunkName: "form" */ '../views/Form.vue')
      },
      beforeEnter: (to: Route, from: Route, next: any) => {
        Form.find(to.params.formId) ? next() : next('/')
      }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
  ]
};

const router = new VueRouter(routeOptions);

export default router;
