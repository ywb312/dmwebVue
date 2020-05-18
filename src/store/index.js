import Vue from 'vue'
import Vuex from 'vuex'
// 本地数据放到vuex 还是存到js中 可改为json
import listPage from "@/store/listPage.js"
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		// 控制加载中的显示隐藏
		isLoading: false,
		// 用户进入功能的序列id
		listNum: 1,
		// 待办事项数据存放
		backlog: {
			records: 0,
			rows: []
		},
		// 列表的渲染数据（标题、路由名、路由下的配置）
		listPage: listPage,
		// 组织结构树
		treeData: [],
		// 点击操作按钮获取的对象
		selectData: {},
	},
	mutations: {
		setListNum(state, num) {
			state.listNum = num;
		},
		setIsLoading(state, bol) {
			state.isLoading = bol.isLoading;
		},
		setTree(state, data) {
			state.treeData = data;
		},
		setBacklog(state, data) {
			state.backlog = data;
		},
		getSelectData(state, data) {
			state.selectData = data;
		}
	},
	actions: {},
	modules: {}
})