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
				page: [{
					text: "通知公告管理",
					id: "publicnotify"
				}, {
					text: "新闻动态",
					id: "pubcontext"
				}],
			},
			{
				title: "隐患管理",
				path: "danger",
				page: [{
					text: "隐患处理",
					id: "zdrisknotice"
				}, {
					text: "隐患详情查询",
					id: "processrisk"
				}, {
					text: "重大隐患评估记录",
					id: "zdriskassess"
				}, {
					text: "重大隐患督办记录",
					id: "zdriskfeet"
				}, {
					text: "隐患整改指令记录",
					id: "zdriskreform"
				}, {
					text: "隐患申请复查记录",
					id: "zdriskreview"
				}, {
					text: "隐患验收结果记录",
					id: "zdriskaccept"
				}, {
					text: "重大隐患闭环记录",
					id: "zdriskclose"
				}]
			},
			{
				title: "计划管理",
				path: "plan",
				page: [{
					text: "我的检查计划",
					id: "myPlan"
				}, {
					text: "计划查询",
					id: "scdetail"
				}, {
					text: "专项检查计划",
					id: "special"
				}],
			},
			{
				title: "提醒预警",
				path: "remind",
				page: ["隐患预警", "检查逾期预警", "隐患逾期预警"],
			},
			{
				title: "风险管理",
				path: "risk",
				page: [{
						text: "风险辨识",
						id: "info",
						condition: [{
							show: "1",
							text: "班组级"
						}, {
							show: "2",
							text: "车间/厂级"
						}, {
							show: "3",
							text: "车间/厂级"
						}],
					}, {
						text: "审核列表",
						id: "auditpj",
						condition: [{
							show: "2",
							text: "车间级"
						}, {
							show: "3",
							text: "厂级"
						}, {
							show: "4",
							text: "安环部"
						}],
					},
					{
						text: "车间级汇总上报",
						id: "reportrisk",
						condition: [{
							show: "2",
						}],
					},
					{
						text: "厂级汇总上报",
						id: "reporpjtrisk",
						condition: [{
							show: "3",
						}],
					},
					{
						text: "风险清单",
						id: "riskreport",
						condition: [{
							show: "3",
						}, {
							show: "4",
						}],
					},
					{
						text: "风险比较图",
						id: "fxwxytj",
						condition: [{
							show: "3",
						}, {
							show: "4",
						}],
					},
					{
						text: "安全风险公告栏",
						id: "ggl",
						condition: [{
							show: "3",
						}, {
							show: "4",
						}],
					},
					{
						text: "岗位风险告知卡",
						id: "gzk",
						condition: [{
							show: "1",
						}, {
							show: "2",
						}, {
							show: "3",
						}, {
							show: "4",
						}],
					}
				],
			},
			{
				title: "作业现场管理",
				path: "person",
				page: [{
						text: "特种作业安全管理",
						child: [{
							text: "特种人员管理",
							id: "specialPeople"
						}, {
							text: "持证上岗人员",
							id: "certifiedPeople"
						// }, {
						// 	text: "特种作业人员培训计划",
						// 	id: "traproject"
						// }, {
						// 	text: "特种作业人员培训记录",
						// 	id: "trarecord"
						// }, {
						// 	text: "特种作业人员培训结果",
						// 	id: "trasummary"
						}]
					},
					{
						text: "关键任务作业安全管理",
						child: [{
							text: "许可作业清单录入",
							id: "permissioninfo"
						}, {
							text: "安全操作规程",
							id: "safetypro"
						}, {
							text: "许可作业申请、审批",
							id: "permissionapply"
						}, {
							text: "任务观察记录录入",
							id: "taskobserve"
						}, {
							text: "作业指导书",
							id: "operinstruc"
						}]
					},
					{
						text: "工作票管理",
						child: [{
							text: "工作票的申请",
							id: "operationticket"
						}, {
							text: "工作票执行总结",
							id: "worksummary"
						}]
					},
					{
						text: "劳动防护用品管理",
						child: [{
							text: "劳动防护用品发放记录",
							id: "articleRecord"
						}, {
							text: "劳动防护用品需求调查",
							id: "articlesurvey"
						}, {
							text: "劳动防护用品评估",
							id: "articleevaluate"
						}, {
							text: "劳动防护用品发放使用标准",
							id: "articleStandard"
						}]
					},
					{
						text: "领导带班下井",
						child: [{
							text: "带班计划",
							id: "leaderplan"
						}, {
							text: "带班交接记录",
							id: "leaderrecord"
						}]
					},
					{
						text: "外来人员参观管理",
						child: [{
							text: "外来人员下井记录",
							id: "outsiderManage"
						}, {
							text: "外来人员安全培训记录",
							id: "outsidertrain"
						}]
					},
					{
						text: "环境保护与水土保持",
						child: [{
							text: "地质灾害检查",
							id: "geologyCheck"
						}]
					},
					{
						text: "危险化学品管理",
						child: [{
							text: "危险化学品库存",
							id: "dangerousIn"
						}, {
							text: "危险化学品领用",
							id: "dangerousOut"
						}]
					},
					{
						text: "交接班管理",
						child: [{
							text: "交接班记录",
							id: "classMeettingInfo"
						}]
					},
					{
						text: "安全警示标志管理",
						child: [{
							text: "安全标志申请界面",
							id: "safetySignApply"
						}, {
							text: "安全标志发放登记",
							id: "safetySignOffer"
						}]
					},
					{
						text: "照明管理",
						child: [{
							text: "照明设施配备清单",
							id: "illuminecabinet"
						}, {
							text: "照明设施检查记录",
							id: "illuminecheck"
						}]
					},
					{
						text: "消防器材管理",
						child: [{
							text: "防灭火器器材配置记录",
							id: "hydcabinet"
						}, {
							text: "防灭火器器材更换记录",
							id: "hydrant"
						}]
					},
					{
						text: "爆破作业管理",
						child: [{
							text: "中深孔爆破申请(全部)",
							id: "taskblastappinfo"
						}]
					},
					{
						text: "基础信息维护",
						child: [{
							text: "井下作业面安全确认项维护",
							id: "taskworksafetyconfirmitems"
						}, {
							text: "安全标志标识库",
							id: "tasksafemarkinfo",
						}]
					},
				],
			},
			{
				title: "安全环保生产方针与目标",
				path: "target",
				page: [{
					text: "安全生产方针",
					child: [{
						text: "安全生产方针发布、修订(环保)",
						id: "patpolicy1"
					}, {
						text: "安全生产方针发布、修订(消防)",
						id: "patpolicy2"
					}, {
						text: "安全生产方针发布、修订(安全)",
						id: "patpolicy3"
					}, {
						text: "安全生产方针意见征集(环保)",
						id: "patopinion1"
					}, {
						text: "安全生产方针意见征集(消防)",
						id: "patopinion2"
					}, {
						text: "安全生产方针意见征集(安全)",
						id: "patopinion3"
					}]
				}, {
					text: "安全生产目标",
					child: [{
						text: "安全生产目标意见征集(环保)",
						id: "opinionobj1"
					}, {
						text: "安全生产目标意见征集(消防)",
						id: "opinionobj2"
					}, {
						text: "安全生产目标意见征集(安全)",
						id: "opinionobj3"
					}, {
						text: "企业安全生产目标发布修订(环保)",
						id: "annualobj1"
					}, {
						text: "企业安全生产目标发布修订(消防)",
						id: "annualobj2"
					}, {
						text: "企业安全生产目标发布修订(安全)",
						id: "annualobj3"
					}, {
						text: "安全生产目标分解(环保)",
						id: "thinobj1"
					}, {
						text: "安全生产目标分解(消防)",
						id: "thinobj2"
					}, {
						text: "安全生产目标分解(安全)",
						id: "thinobj3"
					}, {
						text: "安全生产目标考核(环保)",
						id: "assessmentobj1"
					}, {
						text: "安全生产目标考核(消防)",
						id: "assessmentobj2"
					}, {
						text: "安全生产目标考核(安全)",
						id: "assessmentobj3"
					}]
				}, {
					text: "环保方针目标",
					child: [{
						text: "环保措施计划(环保)",
						id: "envmeasure1"
					}, {
						text: "环保措施计划(消防)",
						id: "envmeasure2"
					}, {
						text: "环保措施计划(安全)",
						id: "envmeasure3"
					}, {
						text: "年度环保工作计划(环保)",
						id: "envYearWorkPlan1"
					}, {
						text: "年度环保工作计划(消防)",
						id: "envYearWorkPlan2"
					}, {
						text: "年度环保工作计划(安全)",
						id: "envYearWorkPlan3"
					}, {
						text: "环境方针目标(环保)",
						id: "envPolicyAims1"
					}, {
						text: "环境方针目标(消防)",
						id: "envPolicyAims2"
					}, {
						text: "环境方针目标(安全)",
						id: "envPolicyAims3"
					}]
				}],
			},
			{
				title: "教育培训",
				path: "education",
				page: [{
					text: "培训计划管理(消防)",
					id: "traplan2"
				}, {
					text: "培训计划管理(环保)",
					id: "traplan1"
				}, {
					text: "培训计划管理(安全)",
					id: "traplan3"
				}],
			},
			{
				title: "生产工艺系统安全管理",
				path: "technology",
				page: [{
					text: "项目三同时管理",
					child: [{
						text: "重大安全环保项目申请",
						id: "apply1"
					}, {
						text: "职业卫生项目的申请",
						id: "apply2"
						// }, {
						// 	text: "安全预评价报告备案",
						// 	id: "record1"
						// }, {
						// 	text: "环保预评价报告备案",
						// 	id: "record2"
					}, {
						text: "安全环保设施设计审查",
						id: "examine1"
					}, {
						text: "职业卫生设施设计审查",
						id: "examine2"
					}, {
						text: "消防项目设计审查",
						id: "examine3"
					}, {
						text: "安全环保设施竣工验收信息",
						id: "completed1"
					}, {
						text: "职业卫生设施竣工验收信息",
						id: "completed2"
					}, {
						text: "消防项目竣工验收信息",
						id: "completed3"
					}]
				}, {
					text: "排水安全管理",
					child: [{
						text: "水泵检查记录",
						id: "draincheck1"
					}, {
						text: "水泵排水记录",
						id: "draininfo"
					}, {
						text: "水仓检查记录",
						id: "draincheck2"
					}, {
						text: "水仓清淤记录",
						id: "dibholedesilt"
					}]
				}, {
					text: "供电安全管理",
					child: [{
						text: "供电线路维护",
						id: "powermaintain"
					}, {
						text: "变电室检查",
						id: "powerroomcheck"
					}]
				}, {
					text: "顶板、采空区管理",
					child: [{
						text: "顶板分级信息",
						id: "roofgrading"
					}, {
						text: "采空区分布信息",
						id: "taskdistributioninfo"
					}, {
						text: "采空区监控信息",
						id: "taskmonitorinfo"
					}]
				}, {
					text: "通风安全管理",
					id: "prodaeration"
				}, {
					text: "提升运输安全管理",
					child: [{
						text: "运输线路检查记录",
						id: "transrecord1"
					}, {
						text: "提升运输设备设施检测检验报告",
						id: "transrecord2"
					}]
				}, {
					text: "安全避险“六大系统”安全管理",
					child: [{
						text: "系统监测数据添加、查看",
						id: "monitordata"
					}, {
						text: "系统检查结果添加、查看",
						id: "checkresult"
					}, {
						text: "六大系统设备设施的检查、维护",
						id: "equfailure"
					}]
				}],
			},
			{
				title: "环保管理",
				path: "environment",
				page: [{
						text: "在线设施台账",
						id: "onlinefacility",
					},
					{
						text: "固体废物产生利用统计表",
						id: "sowageut",
					},
					{
						text: "项目建设情况",
						id: "projectconst",
					},
					{
						text: "排口台账",
						id: "drainageacc",
					},
					{
						text: "评先创优情况",
						id: "comfirstsitu",
					},
					{
						text: "危险废物处置统计表",
						id: "hazwastedis",
					}
				],
			},
			{
				title: "应急管理",
				path: "emergency",
				page: [{
					text: "应急预案",
					child: [{
						text: "应急预案维护(环保)",
						id: "emergplanlist1",
					}, {
						text: "应急预案维护(消防)",
						id: "emergplanlist2",
					}, {
						text: "应急预案维护(安全)",
						id: "emergplanlist3",
					}, {
						text: "应急预案审批(环保)",
						id: "emergplancreate1",
					}, {
						text: "应急预案审批(消防)",
						id: "emergplancreate2",
					}, {
						text: "应急预案审批(安全)",
						id: "emergplancreate3",
					}]
				}, {
					text: "应急队伍",
					child: [{
						text: "应急救援队伍信息(环保)",
						id: "emergagency1",
					}, {
						text: "应急救援队伍信息(消防)",
						id: "emergagency2",
					}, {
						text: "应急救援队伍信息(安全)",
						id: "emergagency3",
					}]
				}, {
					text: "应急演练方案",
					child: [{
						text: "应急演练方案(环保)",
						id: "drillplan1",
					}, {
						text: "应急演练方案(消防)",
						id: "drillplan2",
					}, {
						text: "应急演练方案(安全)",
						id: "drillplan3",
					}]
				}, {
					text: "应急演练记录",
					child: [{
						text: "应急演练记录(环保)",
						id: "drillrecord1",
					}, {
						text: "应急演练记录(消防)",
						id: "drillrecord2",
					}, {
						text: "应急演练记录(安全)",
						id: "drillrecord3",
					}]
				}, {
					text: "应急演练评价",
					child: [{
						text: "应急演练评价(环保)",
						id: "drillevaluate1",
					}, {
						text: "应急演练评价(消防)",
						id: "drillevaluate2",
					}, {
						text: "应急演练评价(安全)",
						id: "drillevaluate3",
					}]
				}, {
					text: "应急资源登记",
					child: [{
						text: "应急资源登记(环保)",
						id: "materialinfo1",
					}, {
						text: "应急资源登记(消防)",
						id: "materialinfo2",
					}, {
						text: "应急资源登记(安全)",
						id: "materialinfo3",
					}]
				}],
			},
			{
				title: "事故管理",
				path: "accident",
				page: [{
					text: "事故快报",
					child: [{
						text: "事故快报(环保)",
						id: "accireport1",
					}, {
						text: "事故快报(消防)",
						id: "accireport2",
					}, {
						text: "事故快报(安全)",
						id: "accireport3",
					}]
				}, {
					text: "事故详情",
					child: [{
						text: "事故详情(环保)",
						id: "accidetabs1",
					}, {
						text: "事故详情(消防)",
						id: "accidetabs2",
					}, {
						text: "事故详情(安全)",
						id: "accidetabs3",
					}]
				}, {
					text: "成立事故调查组",
					child: [{
						text: "成立事故调查组(环保)",
						id: "relateduser1",
					}, {
						text: "成立事故调查组(消防)",
						id: "relateduser2",
					}, {
						text: "成立事故调查组(安全)",
						id: "relateduser3",
					}]
				}, {
					text: "现场调查取证",
					child: [{
						text: "现场调查取证(环保)",
						id: "accihapevi1",
					}, {
						text: "现场调查取证(消防)",
						id: "accihapevi2",
					}, {
						text: "现场调查取证(安全)",
						id: "accihapevi3",
					}]
				}, {
					text: "事故分析",
					child: [{
						text: "事故分析(环保)",
						id: "accisutabs1",
					}, {
						text: "事故分析(消防)",
						id: "accisutabs2",
					}, {
						text: "事故分析(安全)",
						id: "accisutabs3",
					}]
				}, {
					text: "调查报告",
					child: [{
						text: "调查报告(环保)",
						id: "accsureport1",
					}, {
						text: "调查报告(消防)",
						id: "accsureport2",
					}, {
						text: "调查报告(安全)",
						id: "accsureport3",
					}]
				}, {
					text: "事故事件库",
					child: [{
						text: "事故事件库(环保)",
						id: "accistore1",
					}, {
						text: "事故事件库(消防)",
						id: "accistore2",
					}, {
						text: "事故事件库(安全)",
						id: "accistore3",
					}]
				}],
			}
		],
		// 危害 下拉框配置
		knfsSlots: [{
			values: [{
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
		// 影响范围 下拉框配置
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
		// 潜在后果 下拉框配置
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
		// LEC评价	下拉框配置
		lecSlotsL: [{
			values: [{
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
			]
		}],
		lecSlotsE: [{
			values: [{
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
			]
		}],
		lecSlotsC: [{
			values: [{
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
			]
		}],
		// 管控措施	下拉框配置
		gTypeSlots: [{
			values: [{
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
			]
		}],
		// 类型数组 下拉框配置
		fxtypeSlots: [{
			values: [{
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
			]
		}],
		// 事故类型	下拉框配置
		sglbSlots: [{
			values: [{
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
				},
			]
		}],
		// 事故伤亡类型	下拉框配置
		sgdjSlots: [{
			values: [{
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
				},
			]
		}],
		// 组织结构树
		treeData: "",
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