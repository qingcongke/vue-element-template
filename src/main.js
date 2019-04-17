import Vue from "vue";
import App from "./App.vue";
import axios from "./http";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
