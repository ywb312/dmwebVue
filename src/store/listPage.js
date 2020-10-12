export default [{
    title: "通知公告",
    path: "inform",
    page: [{
        text: "通知公告管理",
        id: "publicnotify"
    }, {
        text: "新闻动态",
        id: "pubcontext"
    }]
}, {
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
}, {
    title: "计划管理",
    path: "plan",
    page: [{
        text: "我的检查计划",
        id: "myPlan"
    }, {
        text: "计划查询",
        id: "scdetail"
        // }, {
        //     text: "专项检查计划",
        //     id: "special"
    }]
}, {
    title: "提醒预警",
    path: "remind",
    page: [{
        text: "隐患预警",
        id: "warninginfo"
    }, {
        text: "检查逾期预警",
        id: "checkplannotice"
    }, {
        text: "隐患逾期预警",
        id: "zdriskolddatenotice"
    }]
}, {
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
            text: "工段级"
        }, {
            show: "3",
            text: "车间级"
        }]
    }, {
        text: "审核列表",
        id: "auditpj",
        condition: [{
            show: "2",
            text: "工段级"
        }, {
            show: "3",
            text: "车间级"
        }, {
            show: "4",
            text: "安环部"
        }]
    }, {
        text: "工段级汇总上报",
        id: "reportrisk",
        condition: [{
            show: "2"
        }]
    }, {
        text: "车间级汇总上报",
        id: "reporpjtrisk",
        condition: [{
            show: "3"
        }]
    }, {
        text: "风险清单",
        id: "riskreport",
        condition: [{
            show: "3"
        }, {
            show: "4"
        }, {
            show: "5"
        }]
    }, {
        text: "风险比较图",
        id: "fxwxytj",
        condition: [{
            show: "3"
        }, {
            show: "4"
        }, {
            show: "5"
        }]
    }, {
        text: "安全风险公告栏",
        id: "ggl",
        condition: [{
            show: "3"
        }, {
            show: "4"
        }, {
            show: "5"
        }]
    }, {
        text: "岗位风险告知卡",
        id: "gzk",
        condition: [{
            show: "1"
        }, {
            show: "2"
        }, {
            show: "3"
        }, {
            show: "4"
        }, {
            show: "5"
        }]
    }, {
        text: "二级危险源汇总",
        id: "twoOnrisk",
        condition: [{
            show: "3"
        }, {
            show: "4"
        }, {
            show: "5"
        }]
    }, {
        text: "安环部修订",
        id: "revise",
        condition: [{
            show: "4"
        }]
    }]
}, {
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
        }]
    }, {
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
    }, {
        text: "工作票管理",
        child: [{
            text: "工作票的申请",
            id: "workticket"
        }, {
            text: "工作票执行总结",
            id: "worksummary"
        }]
    }, {
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
    }, {
        text: "领导带班下井",
        child: [{
            text: "带班计划",
            id: "leaderplan"
        }, {
            text: "带班交接记录",
            id: "leaderrecord"
        }]
    }, {
        text: "外来人员参观管理",
        child: [{
            text: "外来人员下井记录",
            id: "outsiderManage"
        }, {
            text: "外来人员安全培训记录",
            id: "outsidertrain"
        }]
    }, {
        text: "环境保护与水土保持",
        child: [{
            text: "地质灾害检查",
            id: "geologyCheck"
        }]
    }, {
        text: "危险化学品管理",
        child: [{
            text: "危险化学品库存",
            id: "dangerousIn"
        }, {
            text: "危险化学品领用",
            id: "dangerousOut"
        }]
    }, {
        text: "交接班管理",
        child: [{
            text: "交接班记录",
            id: "classMeettingInfo"
        }]
    }, {
        text: "安全警示标志管理",
        child: [{
            text: "安全标志申请界面",
            id: "safetySignApply"
        }, {
            text: "安全标志发放登记",
            id: "safetySignOffer"
        }]
    }, {
        text: "照明管理",
        child: [{
            text: "照明设施配备清单",
            id: "illuminecabinet"
        }, {
            text: "照明设施检查记录",
            id: "illuminecheck"
        }]
    }, {
        text: "消防器材管理",
        child: [{
            text: "防灭火器器材配置记录",
            id: "hydcabinet"
        }, {
            text: "防灭火器器材更换记录",
            id: "hydrant"
        }]
    }, {
        text: "爆破作业管理",
        child: [{
            text: "中深孔爆破申请(全部)",
            id: "taskblastappinfo"
        }]
    }, {
        text: "基础信息维护",
        child: [{
            text: "井下作业面安全确认项维护",
            id: "taskworksafetyconfirmitems"
        }, {
            text: "安全标志标识库",
            id: "tasksafemarkinfo"
        }]
    }]
}, {
    title: "方针与目标",
    path: "target",
    page: [{
        text: "安全生产方针",
        child: [{
            text: "矿山安全生产方针",
            id: "patpolicy3"
        }, {
            text: "矿山环境方针",
            id: "patpolicy2"
        }]
    }, {
        text: "安全生产及消防目标",
        child: [{
            text: "矿山安全生产及消防目标",
            id: "annualobj3"
        }, {
            text: "矿山安全生产及消防目标实施计划",
            id: "envmeasure2"
        }, {
            text: "矿山安全生产及消防目标实施的考核结果",
            id: "envYearWorkPlan2"
        }, ]
    }, {
        text: "环保目标",
        child: [{
            text: "矿山环保目标",
            id: "envPolicyAims3"
        }, {
            text: "矿山环保目标实施计划",
            id: "envmeasure3"
        }, {
            text: "矿山环保目标实施的考核结果",
            id: "envYearWorkPlan3"
        }]
    }]
}, {
    title: "法律法规",
    path: "laws",
    page: [{
        text: "法律法规库",
        child: [{
            text: "法律法规库(环保)",
            id: "rules1"
        }, {
            text: "法律法规库(消防)",
            id: "rules2"
        }, {
            text: "法律法规库(安全)",
            id: "rules3"
        }]
    }, {
        text: "法律法规识别",
        child: [{
            text: "法律法规识别(环保)",
            id: "identify1"
        }, {
            text: "法律法规识别(消防)",
            id: "identify2"
        }, {
            text: "法律法规识别(安全)",
            id: "identify3"
        }]
    }, {
        text: "符合性评价",
        child: [{
            text: "符合性评价(环保)",
            id: "evalu1"
        }, {
            text: "符合性评价(消防)",
            id: "evalu2"
        }, {
            text: "符合性评价(安全)",
            id: "evalu3"
        }]
    }, {
        text: "法律法规、标准清单",
        child: [{
            text: "法律法规、标准清单",
            id: "standardList"
        }]
    }, {
        text: "安全环保部制度清单",
        child: [{
            text: "安全环保部制度清单",
            id: "systemList"
        }]
    }]
}, {
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
    }]
}, {
    title: "项目三同时管理",
    path: "simultaneously",
    page: [{
        text: "建设项目安全“三同时”",
        child: [{
            text: "重大安全环保项目申请",
            id: "apply1"
        }, {
            text: "职业卫生项目的申请",
            id: "apply2"
        }, {
            text: "安全环保设施设计审查",
            id: "examine1"
        }, {
            text: "职业卫生设施设计审查",
            id: "examine2"
        }]
    }, {
        text: "建设项目职业卫生“三同时”",
        child: [{
            text: "重大安全环保项目申请",
            id: "apply1"
        }, {
            text: "职业卫生项目的申请",
            id: "apply2"
        }, {
            text: "安全环保设施设计审查",
            id: "examine1"
        }]
    }, {
        text: "建设项目环保“三同时”管理",
        child: [{
            text: "重大安全环保项目申请",
            id: "apply1"
        }, {
            text: "职业卫生项目的申请",
            id: "apply2"
        }, {
            text: "安全环保设施设计审查",
            id: "examine1"
        }]
    }, {
        text: "水土保持",
        child: [{
            text: "重大安全环保项目申请",
            id: "apply1"
        }, {
            text: "职业卫生项目的申请",
            id: "apply2"
        }, {
            text: "安全环保设施设计审查",
            id: "examine1"
        }]
    }]
}, {
    title: "生产工艺系统安全管理",
    path: "technology",
    page: [{
        text: "通风安全管理",
        child: [{
            text: "风质、风量、风速监测数据",
            id: "prodaeration"
        }, {
            text: "通风系统反风试验记录",
            id: "ventilationcheck"
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
            text: "供电安全管理",
            id: "powermaintain"
        }]
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
    }, {
        text: "顶板、采空区管理",
        child: [{
            text: "顶板分级信息",
            id: "roofgrading"
        }, {
            text: "采空区安全防范措施",
            id: "taskgoafsafe"
        }, {
            text: "采空区分布信息",
            id: "taskdistributioninfo"
        }, {
            text: "采空区监控信息",
            id: "taskmonitorinfo"
        }]
    }, {
        text: "变化管理",
        child: [{
            text: "变化管理",
            id: "prodcreview"
        }]
    }]
}, {
    title: "环保管理",
    path: "environment",
    page: [{
        text: "在线设施台账",
        id: "onlinefacility"
    }, {
        text: "固体废物产生利用统计表",
        id: "sowageut"
    }, {
        text: "项目建设情况",
        id: "projectconst"
    }, {
        text: "排口台账",
        id: "drainageacc"
    }, {
        text: "评先创优情况",
        id: "comfirstsitu"
    }, {
        text: "危险废物处置统计表",
        id: "hazwastedis"
    }]
}, {
    title: "应急管理",
    path: "emergency",
    page: [{
        text: "应急预案",
        child: [{
            text: "应急预案明细",
            id: "emergdetail"
        }, {
            text: "应急预案备案记录",
            id: "emergrecord"
        }]
    }, {
        text: "应急演练",
        child: [{
            text: "应急演练",
            id: "emergdrill"
        }]
    }, {
        text: "应急物资",
        child: [{
            text: "应急物资",
            id: "emergmaterial"
        }]
    }]
}, {
    title: "事故管理",
    path: "accident",
    page: [{
        text: "事故初报表",
        id: "accireportnew"
    }, {
        text: "事故登记台账",
        id: "accibook"
    }, {
        text: "按事故发生季度统计",
        id: "accidentzt"
    }, {
        text: "按事故伤者年龄统计",
        id: "accidentsznl"
    }]
}, {
    title: "设备管理",
    path: "facility",
    page: [{
        text: "特种设备检测检验",
        id: "equipcheck"
    }, {
        text: "特种设备、安标产品台账",
        id: "equipspecial"
    }]
}, {
    title: "组织保障管理",
    path: "team",
    page: [{
        text: "安全管理制度",
        child: [{
            text: "安全管理体系文件清单维护",
            id: "filelist"
        }, {
            text: "安全管理体系制度文件审批",
            id: "filecreate"
        }, {
            text: "安全生产责任制清单维护",
            id: "safprodclist"
        }, {
            text: "安全生产责任制审批",
            id: "safprodccreate"
        }, {
            text: "安全操作规程清单维护",
            id: "safoperulelist"
        }, {
            text: "安全操作规程审批",
            id: "safoperulcreate"
        }, {
            text: "作业指导书清单维护",
            id: "opeinstrulist"
        }, {
            text: "作业指导书审批",
            id: "opeinstrucreate"
        }]
    }, {
        text: "企业证照",
        child: [{
            text: "企业证照",
            id: "companyLicense"
        }]
    }, {
        text: "安全管理机构信息",
        child: [{
            text: "安全生产委员会信息",
            id: "orgsafetycommitteeinfo"
        }, {
            text: "环境委员会信息",
            id: "orgenvironcommitteeinfo"
        }, {
            text: "消防管理机构信息",
            id: "orgfirecontrolinfo"
        }]
    }, {
        text: "特殊职位人员信息",
        child: [{
            text: "主要负责人证照",
            id: "peoplephoto"
        }, {
            text: "安全员资质",
            id: "secoffqua"
        }, {
            text: "员工代表",
            id: "staffrep"
        }, {
            text: "事故调查员",
            id: "accnve"
        }, {
            text: "职业卫生管理员",
            id: "occhealadmin"
        }]
    }, {
        text: "主要承包商档案",
        child: [{
            text: "承包商资质维护",
            id: "orgcontractor"
        }, {
            text: "承包商安全生产表现评估",
            id: "orgcontractorCon"
        }, {
            text: "承包商资质查看",
            id: "orgcontractorfile"
        }]
    }, {
        text: "员工档案",
        child: [{
            text: "综合档案",
            id: "colligate"
        }, {
            text: "安全资格证档案",
            id: "qualifications"
        }, {
            text: "职业健康档案",
            id: "healthexamperiod"
        }, {
            text: "违章档案",
            id: "peccancy"
        }, {
            text: "工伤职业病档案",
            id: "workinjury"
        }]
    }, {
        text: "安全计划",
        child: [{
            text: "安全计划发布",
            id: "publish"
        }, {
            text: "安全计划完成情况评估",
            id: "evaluate"
        }, {
            text: "安全计划完成情况反馈",
            id: "feedback"
        }]
    }, {
        text: "安全会议",
        child: [{
            text: "会议纪要发布",
            id: "meetinginfo"
        }, {
            text: "会议提出的问题解决措施的跟进",
            id: "resolvemeasure"
        }]
    }, {
        text: "安全合理化建议",
        child: [{
            text: "安全合理化建议的收集",
            id: "collect"
        }, {
            text: "安全合理化建议的评审奖励",
            id: "rewards"
        }]
    }, {
        text: "尾矿库信息",
        child: [{
            text: "尾矿库建设信息",
            id: "tailingjs"
        }, {
            text: "尾矿库安全评价信息",
            id: "tailingevaluate"
        }]
    }, {
        text: "系统管理评审",
        child: [{
            text: "管理评审计划",
            id: "systemjudgeplan"
        }, {
            text: "管理评审会议记录",
            id: "systemjudgemeeting"
        }, {
            text: "管理评审报告",
            id: "systemjudgereport"
        }]
    }, {
        text: "相关方管理",
        child: [{
            text: "相关方维护",
            id: "stakeholder"
        }, {
            text: "相关方项目部月份从业人员登记",
            id: "stakeholderMonth"
        }, {
            text: "相关方项目部人员统计表",
            id: "statisticsPeople"
        }, {
            text: "相关方单位情况一览表（矿业公司）",
            id: "stakeholderInfo"
        }]
    }]
}, {
    title: "职业卫生",
    path: "health",
    page: [{
        text: "人员信息",
        child: [{
            text: "公司员工信息登记表",
            id: "companyinfo"
        }, {
            text: "项目部员工信息登记表",
            id: "projectinfo"
        }, {
            text: "外来单位参观检查人员信息表",
            id: "outsideinfo"
        }, {
            text: "炸药库人员信息登记表",
            id: "explosiveinfo"
        }, {
            text: "职业卫生在岗培训登记表",
            id: "hygieneinfo"
        }, {
            text: "在岗培训登记表",
            id: "guardinfo"
        }, {
            text: "检修人员登记表",
            id: "overhaulinfo"
        }, {
            text: "清洁工岗前培训登记表",
            id: "cleaninfo"
        }, {
            text: "转岗培训登记表",
            id: "transferinfo"
        }, {
            text: "保卫部人员信息登记表",
            id: "defendinfo"
        }]
    }, {
        text: "健康监护",
        child: [{
            text: "体检计划",
            id: "examplan"
        }, {
            text: "体检上报",
            id: "report"
        }, {
            text: "体检结果",
            id: "examdisease"
        }, {
            text: "职业健康检查结果汇总",
            id: "checkResult"
        }, {
            text: "职业健康检查异常结果汇总",
            id: "checkAbnormal"
        }]
    }, {
        text: "职业卫生监测",
        child: [{
            text: "工作场所噪声监测记录",
            id: "workvoice"
        }, {
            text: "放射源放射性监测",
            id: "radioinfo"
        }, {
            text: "生产粉尘浓度检测",
            id: "dustinfo"
        }, {
            text: "水质监测",
            id: "waterinfo"
        }, {
            text: "通风测尘监测记录",
            id: "ventilateinfo"
        }, {
            text: "职业病危害因素监测表（集团公司功能）",
            id: "harmElement"
        }]
    }, {
        text: "基础信息维护",
        child: [{
            text: "体检周期维护",
            id: "examperiod"
        }, {
            text: "检测仪器管理",
            id: "equipinfo"
        }, {
            text: "设备设施维护",
            id: "equip"
        }, {
            text: "作业场所职业危害阈值维护",
            id: "dangernum"
        }, {
            text: "水质监测项目维护",
            id: "waternumber"
        }]
    }]
}, {
    title: "安全环保投入",
    path: "inject",
    page: [{
        text: "安全投入使用计划管理",
        id: "safeinvestment"
    }, {
        text: "安全措施项目记录管理",
        id: "safemeasures"
    }, {
        text: "安全科研技改项目记录管理",
        id: "saferesearch"
    }, {
        text: "工伤保险管理",
        child: [{
            text: "安全生产责任险批号管理",
            id: "safenum"
        }, {
            text: "安全生产责任险登记",
            id: "saferesp"
        }, {
            text: "工伤保险理赔信息记录",
            id: "safeinsurance"
        }]
    }]
}, {
    title: "消防管理",
    path: "fire",
    page: [{
        text: "重要部位登记表 ",
        child: [{
            text: "人员密集场所登记表",
            id: "staffdenseplace"
        }, {
            text: "易燃易爆场所登记表",
            id: "dangerplace"
        }]
    }, {
        text: "重要场所消防验收情况统计",
        id: "fireaccept"
    }, {
        text: "消防安全检查登记表",
        id: "checkplanXf"
    }, {
        text: "隐患整改反馈记录",
        id: "feedback"
    }, {
        text: "消防器材设施台账",
        id: "firebook"
    }, {
        text: "消防安全专业工作月报表",
        id: "firemonthreport"
    }, {
        text: "建筑消防设施完好过程控制季报表",
        id: "fireseasonreport"
    }]
}, {
    title: "安全绩效测量与评价",
    path: "performance",
    page: [{
        text: "安全绩效测量",
        child: [{
            text: "绩效测量计划提交",
            id: "safejxsubmit"
        }, {
            text: "绩效评审",
            id: "safejxreview"
        }]
    }, {
        text: "安全体系自评",
        child: [{
            text: "新建自评计划",
            id: "evalplan"
        }, {
            text: "标准化自评评分",
            id: "doscorerules"
        }]
    }, {
        text: "基础数据维护",
        child: [{
            text: "标准化要素项维护",
            id: "items"
        }, {
            text: "标准化自评版本信息维护",
            id: "version"
        }, {
            text: "标准化自评事实",
            id: "evalfacts"
        }]
    }]
}]