import Vue from 'vue'
import Vuex from 'vuex'

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
		listPage: [{
				title: "通知公告",
				path: "inform",
				page: ["通知公告管理", "新闻动态"],
			},
			{
				title: "隐患管理",
				path: "danger",
				page: ["隐患处理", "隐患详情查询", "重大隐患评估记录", "重大隐患督办记录", "隐患整改指令记录", "隐患申请复查记录", "隐患验收结果记录", "重大隐患闭环记录"]
			},
			{
				title: "计划管理",
				path: "plan",
				page: ["我的检查计划", "计划查询", "专项检查计划"],
			},
			{
				title: "提醒预警",
				path: "remind",
				page: ["隐患预警", "检查逾期预警", "隐患逾期预警"],
			},
			{
				title: "风险管理",
				path: "risk",
				page: ["车间/厂级风险辨识", "风险清单", "风险比较图", "风险统计", "安全风险公告栏", "岗位风险告知卡"],
			},
			{
				title: "三项人员信息管理",
				path: "person",
				page: ["特种作业人员信息", "持证人员信息", "主要负责人信息"],
			},
			{
				title: "安全环保生产方针与目标",
				path: "target",
				page: ["安全生产方针", "安全生产目标", "环保方针目标"],
			},
			{
				title: "教育培训",
				path: "education",
				page: ["考试", "考试结果", "我的考试结果", "培训计划管理(消防)", "培训计划管理(环保)"],
			},
			{
				title: "生产工艺系统安全管理",
				path: "technology",
				page: ["项目三同时管理", "排水安全管理", "供电安全管理", "顶板、采空区管理", "通风安全管理", "提升运输安全管理"],
			},
			{
				title: "环保管理",
				path: "environment",
				page: ["在线设施台账", "固体废物产生利用统计表", "项目建设情况", "排口台账", "评先创优情况", "危险废物处置统计表"],
			},
			{
				title: "应急管理",
				path: "emergency",
				page: ["应急预案", "应急队伍", "应急演练方案", "应急演练记录", "应急演练评价", "应急资源登记"],
			},
			{
				title: "事故管理",
				path: "accident",
				page: ["事故快报", "事故详情", "成立事故调查组", "现场调查取证", "事故分析", "调查报告", "事故事件库"],
			}
		],
		// 危害 下拉框的配置
		knfsSlots: [{
			values: [{
					text: "请选择",
					id: ""
				},
				{
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
			]
		}],
		// 影响范围 下拉框的配置
		yxfwSlots: [{
			values: [{
					text: "请选择",
					id: ""
				},
				{
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
			]
		}],
		// 潜在后果 下拉框的配置
		qzhgSlots: [{
			values: [{
					text: "请选择",
					id: ""
				},
				{
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
			]
		}],
		// 组织结构树
		treeData: "",
		// 点击操作按钮获取的对象
		selcetData: {},
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
		getSelcetData(state, data) {
			state.selcetData = data;
		}
	},
	actions: {},
	modules: {}
})