import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api/api'
import common from './utils/common'

Vue.use(MintUI)
Vue.use(axios)
Vue.prototype.$api = api;
Vue.prototype.$common = common;

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')