import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueObserveVisibility from 'vue-observe-visibility'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/main.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.use(VueObserveVisibility)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')