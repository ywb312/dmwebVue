import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		// 控制加载中的显示隐藏
		isLoading: false,
		// 用户进入功能的序列id
		listNum: 1,
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
				page: ["风险点划分", "危险源辨识", "风险等级评级", "管控措施制定", "风险清单", "安全风险公告栏", "岗位风险告知卡"],
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
		// 组织结构树
		tree:"",
	},
	mutations: {
		setListNum(state, num) {
			state.listNum = num;
		},
		setIsLoading(state, bol) {
			state.isLoading = bol;
		},
		setTree(state,data){
			state.tree = data;
		}
	},
	actions: {},
	modules: {}
})