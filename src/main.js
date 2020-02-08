import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.use(MintUI)
Vue.use(axios)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')