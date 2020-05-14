import Vue from 'vue'
import './assets/css/reset.css'
import './assets/css/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import api from './api/api'
import common from './utils/common'
import 'amfe-flexible'
import {
	Form,
	Field,
	NavBar,
	Icon,
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
	Button,
	Dialog,
	DatetimePicker,
	Col,
	Row,
	List,
	PullRefresh,
	RadioGroup,
	Radio,
	Picker,
	Loading,
	Uploader,
	ActionSheet
} from 'vant';
// {Radio,Popup,Loadmore,DatetimePicker,MessageBox} mintUI使用的组件
Vue.use(Form) //vant部分
	.use(Field)
	.use(NavBar)
	.use(Icon)
	.use(Grid)
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
	.use(Button)
	.use(Dialog)
	.use(Col)
	.use(Row)
	.use(DatetimePicker)
	.use(List)
	.use(PullRefresh)
	.use(RadioGroup)
	.use(Radio)
	.use(Picker)
	.use(Loading)
	.use(Uploader)
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