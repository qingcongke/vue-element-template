import Vue from "vue";
import App from "./App.vue";
import axios from "./http";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import NormailizeCss from "normalize.css";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";

import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.component("icon", Icon);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
