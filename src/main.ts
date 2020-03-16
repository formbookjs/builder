import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vuedraggable';
import './lib/framwork';
import './plugins/vue-composition-api'
import Form from "@/store/models/Form";

Vue.config.productionTip = false;

Form.create({
  data: {
    name: 'Test Form',
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
