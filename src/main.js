import Vue from 'vue'
// 初始化css样式
import './assets/css/reset.css'
// 本地的默认样式
import './assets/css/style.css'
import App from './App.vue'
import router from './router'
// vuex
import store from './store'
// ajax插件
import axios from 'axios'
// 封装的请求
import api from './api/api'
// 公共js
import common from './utils/common'
// 移动端设置html fontsize插件
import 'amfe-flexible'
// 引入vconsole 便于移动端调试
import Vconsole from 'vconsole';
new Vconsole();
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