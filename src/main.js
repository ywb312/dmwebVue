import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
