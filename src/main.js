import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './newStore'
import {currency} from "@/currency"

Vue.config.productionTip = false
Vue.filter('currency', currency)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
