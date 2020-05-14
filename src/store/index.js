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
		// 危害 下拉框配置
		knfsSlots: [{
				text: "物体打击",
				id: "KNFS001"
			},
			{
				text: "车辆伤害",
				id: "KNFS002"
			},
			{
				text: "机械伤害",
				id: "KNFS003"
			},
			{
				text: "起重伤害",
				id: "KNFS004"
			},
			{
				text: "触电",
				id: "KNFS005"
			},
			{
				text: "淹溺",
				id: "KNFS006"
			},
			{
				text: "灼烫",
				id: "KNFS007"
			},
			{
				text: "火灾",
				id: "KNFS008"
			},
			{
				text: "高处坠落",
				id: "KNFS009"
			},
			{
				text: "坍塌",
				id: "KNFS010"
			},
			{
				text: "冒顶片帮",
				id: "KNFS011"
			},
			{
				text: "透水",
				id: "KNFS012"
			},
			{
				text: "放炮",
				id: "KNFS013"
			},
			{
				text: "火药爆炸",
				id: "KNFS014"
			},
			{
				text: "瓦斯爆炸",
				id: "KNFS015"
			},
			{
				text: "锅炉爆炸",
				id: "KNFS016"
			},
			{
				text: "容器爆炸",
				id: "KNFS017"
			},
			{
				text: "其它爆炸",
				id: "KNFS018"
			},
			{
				text: "中毒和窒息",
				id: "KNFS019"
			},
			{
				text: "其它伤害",
				id: "KNFS020"
			}
		],
		// 影响范围 下拉框配置
		yxfwSlots: [{
				text: "本人",
				id: "YXFWEI001"
			},
			{
				text: "本岗位",
				id: "YXFWEI002"
			},
			{
				text: "多岗位",
				id: "YXFWEI003"
			},
			{
				text: "整个系统",
				id: "YXFWEI004"
			}
		],
		// 潜在后果 下拉框配置
		qzhgSlots: [{
				text: "经济损失",
				id: "QZHG001"
			},
			{
				text: "轻伤",
				id: "QZHG002"
			},
			{
				text: "重伤",
				id: "QZHG003"
			},
			{
				text: "死亡",
				id: "QZHG004"
			}
		],
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
		lecSlotsC: [{
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
		// 管控措施	下拉框配置
		gTypeSlots: [{
				text: "工程技术措施",
				id: "GKCSLX001"
			},
			{
				text: "管理措施",
				id: "GKCSLX002"
			},
			{
				text: "培训教育措施",
				id: "GKCSLX003"
			},
			{
				text: "个体防护措施",
				id: "GKCSLX004"
			},
			{
				text: "应急处置措施",
				id: "GKCSLX005"
			}
		],
		// 类型数组 下拉框配置
		fxtypeSlots: [{
				text: "作业活动",
				id: "FXDLX001"
			},
			{
				text: "工艺",
				id: "FXDLX004"
			},
			{
				text: "设备",
				id: "FXDLX002"
			},
			{
				text: "设施",
				id: "FXDLX003"
			}
		],
		// 事故类型	下拉框配置
		sglbSlots: [{
				text: "物体打击",
				id: "SGLB001"
			},
			{
				text: "车辆伤害",
				id: "SGLB002"
			},
			{
				text: "机械伤害",
				id: "SGLB003"
			},
			{
				text: "高处坠落",
				id: "SGLB004"
			},
			{
				text: "冒顶片帮",
				id: "SGLB005"
			},
			{
				text: "中毒窒息",
				id: "SGLB006"
			},
			{
				text: "放炮事故",
				id: "SGLB007"
			},
			{
				text: "起重伤害",
				id: "SGLB008"
			},
			{
				text: "火灾",
				id: "SGLB009"
			},
			{
				text: "灼烫",
				id: "SGLB010"
			},
			{
				text: "触电",
				id: "SGLB011"
			},
			{
				text: "其它伤害",
				id: "SGLB012"
			},
			{
				text: "淹溺",
				id: "SGLB013"
			},
			{
				text: "坍塌",
				id: "SGLB014"
			},
			{
				text: "透水",
				id: "SGLB015"
			},
			{
				text: "火药爆炸",
				id: "SGLB016"
			},
			{
				text: "瓦斯爆炸",
				id: "SGLB017"
			},
			{
				text: "锅炉爆炸",
				id: "SGLB018"
			},
			{
				text: "容器爆炸",
				id: "SGLB019"
			},
			{
				text: "其他爆炸",
				id: "SGLB020"
			},
			{
				text: "自然灾害",
				id: "SGLB021"
			},
			{
				text: "地质灾害",
				id: "SGLB022"
			},
			{
				text: "综合",
				id: "SGLB023"
			}
		],
		// 事故伤亡类型	下拉框配置
		sgdjSlots: [{
				text: "轻伤",
				id: "SGDJ001"
			},
			{
				text: "重伤",
				id: "SGDJ002"
			},
			{
				text: "一般事故",
				id: "SGDJ003"
			},
			{
				text: "较大事故",
				id: "SGDJ004"
			},
			{
				text: "重大事故",
				id: "SGDJ005"
			},
			{
				text: "特别重大事故",
				id: "SGDJ006"
			},
			{
				text: "一般设备事故",
				id: "SGDJ007"
			},
			{
				text: "重大设备事故",
				id: "SGDJ008"
			},
			{
				text: "特大设备事故",
				id: "SGDJ009"
			},
			{
				text: "一般险肇事故",
				id: "SGDJ010"
			},
			{
				text: "重大险肇事故",
				id: "SGDJ011"
			},
			{
				text: "微伤",
				id: "SGDJ012"
			}
		],
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