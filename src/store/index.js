import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		// 控制加载中的显示隐藏
		isLoading:false,
		// 用户进入功能的序列id
		listNum: 1,
		// 列表的渲染数据（标题、配置项、url）
		listPage: [{
				title: "通知公告",
				page: [{
						text: "通知公告管理",
						ajaxurl: "biz/pub/publicnotify/list.action",
						// ajax入参 updata
						// 标题左侧
						headerLeft: {
							key: "标题",
							value: "title",
						},
						// 标题右侧
						headerRight: {
							key: "通知类型",
							value: "notiftype",
						},
						// 内容
						main: [{
							key: "审核人",
							value: "checkman",
						}, {
							key: "发布单位",
							value: "createdept",
						}, {
							key: "发布时间",
							value: "createtime",
						}, {
							key: "修改时间",
							value: "modifytime",
						}, {
							key: "审核时间",
							value: "checktime",
						}, {
							key: "消息内容",
							value: "content"
						}],
					},
					{
						text: "新闻动态",
						ajaxurl: "biz/pub/pubcontext/publist.action",
						headerLeft: {
							key: "标题",
							value: "title",
						},
						headerRight: {
							key: "栏目名称",
							value: "moduleid",
						},
						main: [{
							key: "子栏目",
							value: "remarks",
						}, {
							key: "发布人",
							value: "pubman",
						}, {
							key: "发布单位",
							value: "pubdept",
						}, {
							key: "发布时间",
							value: "pubtime",
						}, {
							key: "修改人",
							value: "updateman",
						}, {
							key: "修改时间",
							value: "updatetime",
						}],
					}
				],
			},
			{
				title: "隐患管理",
				page: [{
						text: "隐患处理",
						ajaxurl: "biz/im/zdrisknotice/list_notice_two.action",
						updata: ["olddate"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "txlb",
						},
						main: [{
							key: "隐患描述",
							value: "crdesc",
						}, {
							key: "隐患场所",
							value: "craddr",
						}, {
							key: "审批时间",
							value: "pcdate",
						}],
					},
					{
						text: "隐患详情查询",
						ajaxurl: "biz/rm/processrisk/list.action",
						updata: ["queryAll", "crstate", "crqy", "str", "end"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "crdeptcode",
						},
						main: [{
							key: "存在问题",
							value: "crdesc",
						}, {
							key: "隐患地点",
							value: "craddr",
						}, {
							key: "检查时间",
							value: "pcdate",
						}, {
							key: "检查人",
							value: "createid",
						}],
					},
					{
						text: "重大隐患评估记录",
						ajaxurl: "biz/rm/zdriskassess/list.action",
						updata: ["str", "end"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "评估部门",
							value: "deptName",
						}, {
							key: "评估描述",
							value: "pgdesc",
						}, {
							key: "管控措施",
							value: "gkcs",
						}, {
							key: "评估时间",
							value: "pgdate",
						}, {
							key: "创建时间",
							value: "createdate",
						}, {
							key: "填表人员",
							value: "tbr",
						}, {
							key: "备注",
							value: "memo",
						}],
					},
					{
						text: "重大隐患督办记录",
						ajaxurl: "biz/rm/zdriskfeet/list.action",
						updata: ["str", "end"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "督办单位",
							value: "deptName",
						}, {
							key: "督办事项",
							value: "column_12",
						}, {
							key: "督办截止日期",
							value: "dbjzdate",
						}, {
							key: "创建日期",
							value: "createdate",
						}, {
							key: "填表人员",
							value: "tbr",
						}, {
							key: "备注",
							value: "memo",
						}],
					},
					{
						text: "隐患整改指令记录",
						ajaxurl: "biz/rm/zdriskreform/list.action",
						updata: ["str", "end", "zgzrdw"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "deptName",
						},
						main: [{
							key: "整改责任单位",
							value: "zgzrdwName",
						}, {
							key: "整改治理要求",
							value: "zgzlyq",
						}, {
							key: "整改截止日期",
							value: "zgdate",
						}, {
							key: "创建日期",
							value: "createdate",
						}, {
							key: "填表人员",
							value: "tbr",
						}, {
							key: "备注",
							value: "memo",
						}],
					},
					{
						text: "隐患申请复查记录",
						ajaxurl: "biz/rm/zdriskreview/list.action",
						updata: ["str", "end", "zgzrdw"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "申请验收单位",
							value: "dwysryname",
						}, {
							key: "申请验收说明",
							value: "dyysqk",
						}, {
							key: "整改申请部门",
							value: "zgpsbmName",
						}, {
							key: "整改情况说明",
							value: "zgpsqk",
						}, {
							key: "验收截止日期",
							value: "fcjzdate",
						}, {
							key: "创建时间",
							value: "createdate",
						}, {
							key: "填表人员",
							value: "tbr",
						}],
					},
					{
						text: "隐患验收结果记录",
						ajaxurl: "biz/rm/zdriskaccept/list.action",
						updata: ["str", "end", "zgzrdw"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "验收负责单位",
							value: "ysfzdwName",
						}, {
							key: "验收专家人员",
							value: "yszjry",
						}, {
							key: "现场验收时间",
							value: "xcyssj",
						}, {
							key: "验收情况",
							value: "ysqk",
						}, {
							key: "创建时间",
							value: "createdate",
						}, {
							key: "填表人员",
							value: "tbr",
						}, {
							key: "备注",
							value: "memo",
						}],
					},
					{
						text: "重大隐患闭环记录",
						// ajaxurl: "biz/rm/zdriskclose/list.action",
						// updata: ["str", "end"],
						// headerLeft: {
						//     key: "标题",
						//     value: "crname",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "验收负责单位",
						//     value: "ysfzdwName",
						// }, {
						//     key: "验收专家人员",
						//     value: "yszjry",
						// }, {
						//     key: "现场验收时间",
						//     value: "xcyssj",
						// }, {
						//     key: "验收情况",
						//     value: "ysqk",
						// }, {
						//     key: "创建时间",
						//     value: "createdate",
						// }, {
						//     key: "填表人员",
						//     value: "tbr",
						// }, {
						//     key: "备注",
						//     value: "memo",
						// }],
					},
				],
			},
			{
				title: "计划管理",
				page: [{
						text: "我的检查计划",
						// ajaxurl: baseUrl +"biz/sc/checkplan/list.action",
						// updata:[],
						// headerLeft: {
						//     key: "标题",
						//     value: "crname",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "txlb",
						// },
						// main: [{
						//     key: "隐患描述",
						//     value: "crdesc",
						// }, {
						//     key: "隐患场所",
						//     value: "craddr",
						// }, {
						//     key: "审批时间",
						//     value: "pcdate",
						// }],
					},
					{
						text: "计划查询",
						// ajaxurl: baseUrl +"biz/sc/checkplan/getChildPlanRecord.action",
						// updata:[],
						// headerLeft: {
						//     key: "标题",
						//     value: "crname",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "txlb",
						// },
						// main: [{
						//     key: "隐患描述",
						//     value: "crdesc",
						// }, {
						//     key: "隐患场所",
						//     value: "craddr",
						// }, {
						//     key: "审批时间",
						//     value: "pcdate",
						// }],
					},
					{
						text: "专项检查计划",
						ajaxurl: "biz/sc/checkplantemp/list.action",
						updata: [],
						headerLeft: {
							key: "标题",
							value: "",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "检查内容",
							value: "cpname",
						}, {
							key: "检查开始时间",
							value: "checkstatar",
						}, {
							key: "检查结束时间",
							value: "checkdeadline",
						}, {
							key: "已完成",
							value: "workload",
						}, {
							key: "未完成",
							value: "undone",
						}],
					}
				],
			},
			{
				title: "提醒预警",
				page: [{
						text: "隐患预警",
						// ajaxurl: "biz/tm/warninginfo/list.action",
						// updata: [],
						// headerLeft: {
						//     key: "标题",
						//     value: "",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "检查内容",
						//     value: "cpname",
						// }, {
						//     key: "检查开始时间",
						//     value: "checkstatar",
						// }, {
						//     key: "检查结束时间",
						//     value: "checkdeadline",
						// }, {
						//     key: "已完成",
						//     value: "workload",
						// }, {
						//     key: "未完成",
						//     value: "undone",
						// }],
					},
					{
						text: "检查逾期预警",
						// ajaxurl: "biz/sc/checkplan/list_child_notice.action",
						// updata: [],
						// headerLeft: {
						//     key: "标题",
						//     value: "",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "检查内容",
						//     value: "cpname",
						// }, {
						//     key: "检查开始时间",
						//     value: "checkstatar",
						// }, {
						//     key: "检查结束时间",
						//     value: "checkdeadline",
						// }, {
						//     key: "已完成",
						//     value: "workload",
						// }, {
						//     key: "未完成",
						//     value: "undone",
						// }],
					},
					{
						text: "隐患逾期预警",
						ajaxurl: "biz/im/zdrisknotice/list_notice_two.action",
						updata: ["olddate"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "隐患描述",
							value: "crdesc",
						}, {
							key: "提醒类型",
							value: "txlb",
						}, {
							key: "隐患类型",
							value: "checkdeadline",
						}, {
							key: "检查人员",
							value: "createid",
						}, {
							key: "截止日期",
							value: "pcdate",
						}, {
							key: "整改单位",
							value: "zgzrdw",
						}],
					}
				],
			},
			{
				title: "风险管理",
				page: [{
						text: "风险点划分",
					},
					{
						text: "危险源辨识",
					},
					{
						text: "风险等级评级",
					},
					{
						text: "管控措施制定",
					},
					{
						text: "风险清单",
					},
					{
						text: "安全风险公告栏",
					},
					{
						text: "岗位风险告知卡",
					},
				],
			},
			{
				title: "三项人员信息管理",
				page: [{
						text: "特种作业人员信息",
						// ajaxurl: "biz/people/specialPeople/list.action",
						// search:true,
						// updata: ["param"],
						// headerLeft: {
						//     key: "标题",
						//     value: "crname",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "隐患描述",
						//     value: "crdesc",
						// }, {
						//     key: "提醒类型",
						//     value: "txlb",
						// }, {
						//     key: "隐患类型",
						//     value: "checkdeadline",
						// }, {
						//     key: "检查人员",
						//     value: "createid",
						// }, {
						//     key: "截止日期",
						//     value: "pcdate",
						// }, {
						//     key: "整改单位",
						//     value: "zgzrdw",
						// }],
					},
					{
						text: "持证人员信息",
						// ajaxurl: "biz/people/certifiedPeople/list.action",
						// search:true,
						// updata: ["param"],
						// headerLeft: {
						//     key: "标题",
						//     value: "crname",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "隐患描述",
						//     value: "crdesc",
						// }, {
						//     key: "提醒类型",
						//     value: "txlb",
						// }, {
						//     key: "隐患类型",
						//     value: "checkdeadline",
						// }, {
						//     key: "检查人员",
						//     value: "createid",
						// }, {
						//     key: "截止日期",
						//     value: "pcdate",
						// }, {
						//     key: "整改单位",
						//     value: "zgzrdw",
						// }],
					},
					{
						text: "主要负责人信息",
						ajaxurl: "biz/people/peoplephoto/list.action",
						search: true,
						updata: ["param"],
						headerLeft: {
							key: "标题",
							value: "peopleName",
						},
						headerRight: {
							key: "栏目名称",
							value: "peopleSex",
						},
						main: [{
							key: "行业类别",
							value: "industry",
						}, {
							key: "出生日期",
							value: "birthday",
						}, {
							key: "职务",
							value: "position",
						}, {
							key: "证件号码",
							value: "idcard",
						}, {
							key: "初领日期",
							value: "startDate",
						}, {
							key: "结束日期",
							value: "endDate",
						}],
					}
				],
			},
			{
				title: "安全环保生产方针与目标",
				page: [{
						text: "安全生产方针",
					},
					{
						text: "安全生产目标",
					},
					{
						text: "环保方针目标",
					}
				],
			},
			{
				title: "教育培训",
				page: [{
						text: "考试",
					},
					{
						text: "考试结果",
					},
					{
						text: "我的考试结果",
					},
					{
						text: "培训计划管理(消防)",
					},
					{
						text: "培训计划管理(环保)",
					},
				],
			},
			{
				title: "生产工艺系统安全管理",
				page: [{
						text: "项目三同时管理",
					},
					{
						text: "排水安全管理",
					},
					{
						text: "供电安全管理",
					},
					{
						text: "顶板、采空区管理",
					},
					{
						text: "通风安全管理",
					},
					{
						text: "提升运输安全管理",
					}
				],
			},
			{
				title: "环保管理",
				page: [{
						text: "在线设施台账",
					},
					{
						text: "固体废物产生利用统计表",
					},
					{
						text: "项目建设情况",
					},
					{
						text: "排口台账",
					},
					{
						text: "评先创优情况",
					},
					{
						text: "危险废物处置统计表",
					}
				],
			},
			{
				title: "应急管理",
				page: [{
						text: "应急预案",
					},
					{
						text: "应急队伍",
					},
					{
						text: "应急演练方案",
					},
					{
						text: "应急演练记录",
					},
					{
						text: "应急演练评价",
					},
					{
						text: "应急资源登记",
					}
				],
			},
			{
				title: "事故管理",
				page: [{
						text: "事故快报",
					},
					{
						text: "事故详情",
					},
					{
						text: "成立事故调查组",
					},
					{
						text: "现场调查取证",
					},
					{
						text: "事故分析",
					},
					{
						text: "调查报告",
					}, {
						text: "事故事件库",
					}
				],
			}
		]
	},
	mutations: {
		setListNum(state, num) {
			state.listNum = num;
		},
		setIsLoading(state, bol){
			state.isLoading = bol;
		}
	},
	actions: {},
	modules: {}
})