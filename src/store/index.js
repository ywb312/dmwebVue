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
		lhTree: [],
		zzTree: [],
		nsTree: [],
		gsTree: [],
		tcTree: [],
		// 矿山代码
		deptId: "",
		// 点击操作按钮获取的对象
		selectData: {},
		// LEC评价	下拉框配置	
		lecSlotsL: [{
				text: "完全可以预料",
				id: "10"
			},
			{
				text: "相当可能",
				id: "6"
			},
			{
				text: "可能、但不经常",
				id: "3"
			},
			{
				text: "可能性小、完全意外",
				id: "1"
			},
			{
				text: "很不可能，可以设想",
				id: "0.5"
			},
			{
				text: "极不可能",
				id: "0.2"
			},
			{
				text: "实际不可能",
				id: "0.1"
			}
		],
		lecSlotsE: [{
				text: "大灾难,许多人死亡",
				id: "100"
			},
			{
				text: "灾难,数人死亡",
				id: "40"
			},
			{
				text: "非常严重,一人死亡",
				id: "15"
			},
			{
				text: "严重重伤",
				id: "7"
			},
			{
				text: "重大，致残",
				id: "3"
			},
			{
				text: "引人注意",
				id: "1"
			}
		],
		lecSlotsC: [{
				text: "连续暴露",
				id: "10"
			},
			{
				text: "每天工作时间暴露",
				id: "6"
			},
			{
				text: "每周一次，或偶然暴露",
				id: "3"
			},
			{
				text: "每月一次暴露",
				id: "2"
			},
			{
				text: "每年几次暴露",
				id: "1"
			},
			{
				text: "非常罕见的暴露",
				id: "0.5"
			}
		],
	},
	mutations: {
		setListNum(state, num) {
			state.listNum = num;
		},
		setIsLoading(state, bol) {
			state.isLoading = bol;
		},
		setTree(state, data) {
			state.treeData = data;
		},
		setLHTree(state, data) {
			state.lhTree = data;
		},
		setZZTree(state, data) {
			state.zzTree = data;
		},
		setNSTree(state, data) {
			state.nsTree = data;
		},
		setTCTree(state, data) {
			state.tcTree = data;
		},
		setGSTree(state, data) {
			state.gsTree = data;
		},
		setBacklog(state, data) {
			state.backlog = data;
		},
		getSelectData(state, data) {
			state.selectData = data;
		},
		getDeptId(state, data) {
			state.deptId = data;
		}
	},
	actions: {},
	modules: {}
})