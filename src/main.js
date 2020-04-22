import Vue from 'vue'
import MintUI from 'mint-ui'
import './assets/css/reset.css'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api/api'
import common from './utils/common'
import 'amfe-flexible'
import {
	Grid,
	GridItem,
	Image,
	Toast,
	Tag,
	Collapse,
	CollapseItem,
	Cell,
	CellGroup,
	Divider,
	Tabbar,
	TabbarItem,
	Sticky,
	Empty,
	Tab,
	Tabs,
	Popup,
	DropdownMenu,
	DropdownItem,
	ActionSheet
} from 'vant';
// {Radio,Popup,Loadmore,DatetimePicker,MessageBox} mintUI使用的组件
Vue.use(MintUI)
	.use(Grid) //vant部分
	.use(GridItem)
	.use(Image)
	.use(Toast)
	.use(Tag)
	.use(Collapse)
	.use(CollapseItem)
	.use(Cell)
	.use(CellGroup)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Empty)
	.use(Sticky)
	.use(Tab)
	.use(Tabs)
	.use(ActionSheet)
	.use(Popup)
	.use(DropdownMenu)
	.use(DropdownItem)
	.use(Divider);
Vue.use(axios)
Vue.prototype.$api = api;
Vue.prototype.$common = common;

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')