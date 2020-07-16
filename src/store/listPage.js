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
        //     text: "隐患处理",
        //     id: "zdrisknotice"
        // }, {
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
    //     text: "我的检查计划",
    //     id: "myPlan"
    // }, {
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
    //     text: "风险辨识",
    //     id: "info",
    // }, {
    //     text: "审核列表",
    //     id: "auditpj",
    // }, {
        text: "风险清单",
        id: "riskreport",
    // }, {
    //     text: "风险比较图",
    //     id: "fxwxytj",
    // }, {
    //     text: "安全风险公告栏",
    //     id: "ggl",
    // }, {
    //     text: "岗位风险告知卡",
    //     id: "gzk",
    }, {
        text: "二级危险源汇总",
        id: "twoOnrisk",
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
    title: "统计分析",
    path: "statistics",
    page: [{
        text: "风险统计",
        child: [{
            text: "风险统计",
            id: "riskSta"
        }]
    }, {
        text: "隐患统计",
        child: [{
        //     text: "隐患数据统计",
        //     id: "leaderView"
        // }, {
            text: "隐患排查统计",
            id: "checkStatistics"
        }, {
            text: "隐患信息统计",
            id: "troubleStatistics"
        }, {
            text: "可能发生的事故统计",
            id: "accident"
        // }, {
        //     text: "车间隐患统计",
        //     id: "deptStatistics"
        }, {
            text: "按时间统计",
            id: "timeStatistics"
        }, {
            text: "按上报人数统计",
            id: "personStatistics"
        }, {
            text: "按账号统计",
            id: "loginPerson"
        }, {
            text: "按隐患名称统计",
            id: "troubleNmae"
        // }, {
        //     text: "按不同单位同台设备统计",
        //     id: "devName"
        }]
    }]
}, {
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
            text: "应急预案维护(环保)",
            id: "emergplanlist1"
        }, {
            text: "应急预案维护(消防)",
            id: "emergplanlist2"
        }, {
            text: "应急预案维护(安全)",
            id: "emergplanlist3"
        }, {
            text: "应急预案审批(环保)",
            id: "emergplancreate1"
        }, {
            text: "应急预案审批(消防)",
            id: "emergplancreate2"
        }, {
            text: "应急预案审批(安全)",
            id: "emergplancreate3"
        }]
    }, {
        text: "应急队伍",
        child: [{
            text: "应急救援队伍信息(环保)",
            id: "emergagency1"
        }, {
            text: "应急救援队伍信息(消防)",
            id: "emergagency2"
        }, {
            text: "应急救援队伍信息(安全)",
            id: "emergagency3"
        }]
    }, {
        text: "应急演练方案",
        child: [{
            text: "应急演练方案(环保)",
            id: "drillplan1"
        }, {
            text: "应急演练方案(消防)",
            id: "drillplan2"
        }, {
            text: "应急演练方案(安全)",
            id: "drillplan3"
        }]
    }, {
        text: "应急演练记录",
        child: [{
            text: "应急演练记录(环保)",
            id: "drillrecord1"
        }, {
            text: "应急演练记录(消防)",
            id: "drillrecord2"
        }, {
            text: "应急演练记录(安全)",
            id: "drillrecord3"
        }]
    }, {
        text: "应急演练评价",
        child: [{
            text: "应急演练评价(环保)",
            id: "drillevaluate1"
        }, {
            text: "应急演练评价(消防)",
            id: "drillevaluate2"
        }, {
            text: "应急演练评价(安全)",
            id: "drillevaluate3"
        }]
    }, {
        text: "应急资源登记",
        child: [{
            text: "应急资源登记(环保)",
            id: "materialinfo1"
        }, {
            text: "应急资源登记(消防)",
            id: "materialinfo2"
        }, {
            text: "应急资源登记(安全)",
            id: "materialinfo3"
        }]
    }]
}, {
    title: "事故管理",
    path: "accident",
    page: [{
        text: "事故快报",
        child: [{
            text: "事故快报(环保)",
            id: "accireport1"
        }, {
            text: "事故快报(消防)",
            id: "accireport2"
        }, {
            text: "事故快报(安全)",
            id: "accireport3"
        }]
    }, {
        text: "事故详情",
        child: [{
            text: "事故详情(环保)",
            id: "accidetabs1"
        }, {
            text: "事故详情(消防)",
            id: "accidetabs2"
        }, {
            text: "事故详情(安全)",
            id: "accidetabs3"
        }]
    }, {
        text: "成立事故调查组",
        child: [{
            text: "成立事故调查组(环保)",
            id: "relateduser1"
        }, {
            text: "成立事故调查组(消防)",
            id: "relateduser2"
        }, {
            text: "成立事故调查组(安全)",
            id: "relateduser3"
        }]
    }, {
        text: "现场调查取证",
        child: [{
            text: "现场调查取证(环保)",
            id: "accihapevi1"
        }, {
            text: "现场调查取证(消防)",
            id: "accihapevi2"
        }, {
            text: "现场调查取证(安全)",
            id: "accihapevi3"
        }]
    }, {
        text: "事故分析",
        child: [{
            text: "事故分析(环保)",
            id: "accisutabs1"
        }, {
            text: "事故分析(消防)",
            id: "accisutabs2"
        }, {
            text: "事故分析(安全)",
            id: "accisutabs3"
        }]
    }, {
        text: "调查报告",
        child: [{
            text: "调查报告(环保)",
            id: "accsureport1"
        }, {
            text: "调查报告(消防)",
            id: "accsureport2"
        }, {
            text: "调查报告(安全)",
            id: "accsureport3"
        }]
    }, {
        text: "事故事件库",
        child: [{
            text: "事故事件库(环保)",
            id: "accistore1"
        }, {
            text: "事故事件库(消防)",
            id: "accistore2"
        }, {
            text: "事故事件库(安全)",
            id: "accistore3"
        }]
    }]
}, {
    title: "设备设施管理",
    path: "facility",
    page: [{
        text: "设备、设施、器具台账管理",
        child: [{
            text: "设备、设施、器具台账管理(环保)",
            id: "devlist1"
        }, {
            text: "设备、设施、器具台账管理(消防)",
            id: "devlist2"
        }, {
            text: "设备、设施、器具台账管理(安全)",
            id: "devlist3"
        }]
    }, {
        text: "设备、设施、器具购置与租赁",
        child: [{
            text: "设备、设施、器具购置与租赁(环保)",
            id: "devpurchase1"
        }, {
            text: "设备、设施、器具购置与租赁(消防)",
            id: "devpurchase2"
        }, {
            text: "设备、设施、器具购置与租赁(安全)",
            id: "devpurchase3"
        }]
    }, {
        text: "设备、设施、器具检验检测记录",
        child: [{
            text: "设备、设施、器具检验检测记录(环保)",
            id: "devexpair1"
        }, {
            text: "设备、设施、器具检验检测记录(消防)",
            id: "devexpair2"
        }, {
            text: "设备、设施、器具检验检测记录(安全)",
            id: "devexpair3"
        }]
    }, {
        text: "设备、设施、器具维修维护",
        child: [{
            text: "设备、设施、器具维修维护(环保)",
            id: "devmaintain1"
        }, {
            text: "设备、设施、器具维修维护(消防)",
            id: "devmaintain2"
        }, {
            text: "设备、设施、器具维修维护(安全)",
            id: "devmaintain3"
        }]
    }, {
        text: "设备、设施、器具报废封存",
        child: [{
            text: "设备、设施、器具报废封存(环保)",
            id: "devscrap1"
        }, {
            text: "设备、设施、器具报废封存(消防)",
            id: "devscrap2"
        }, {
            text: "设备、设施、器具报废封存(安全)",
            id: "devscrap3"
        }]
    }, {
        text: "特种设备台帐",
        child: [{
            text: "特种设备台帐(环保)",
            id: "devspeciallist1"
        }, {
            text: "特种设备台帐(消防)",
            id: "devspeciallist2"
        }, {
            text: "特种设备台帐(安全)",
            id: "devspeciallist3"
        }]
    }, {
        text: "特种设备检测检验报告",
        child: [{
            text: "特种设备检测检验报告(环保)",
            id: "devtzsbjc1"
        }, {
            text: "特种设备检测检验报告(消防)",
            id: "devtzsbjc2"
        }, {
            text: "特种设备检测检验报告(安全)",
            id: "devtzsbjc3"
        }]
    }, {
        text: "安全标志产品档案",
        child: [{
            text: "安全标志产品档案(环保)",
            id: "devsafetysigns1"
        }, {
            text: "安全标志产品档案(消防)",
            id: "devsafetysigns2"
        }, {
            text: "安全标志产品档案(安全)",
            id: "devsafetysigns3"
        }]
    }, {
        text: "安全标志产品检测检验报告",
        child: [{
            text: "安全标志产品检测检验报告(环保)",
            id: "devsafetysignsjc1"
        }, {
            text: "安全标志产品检测检验报告(消防)",
            id: "devsafetysignsjc2"
        }, {
            text: "安全标志产品检测检验报告(安全)",
            id: "devsafetysignsjc3"
        }]
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
        text: "消防工作记录清单",
        id: "fireworklist"
    }, {
        text: "消防基础台账",
        child: [{
            text: "消防管理制度",
            id: "firemanage"
        }, {
            text: "消防设备设施汇总",
            id: "fireinfo"
        }, {
            text: "消防安全责任书",
            id: "firesaferespon"
        }, {
            text: "消防从业人员资格证汇总",
            id: "firecertificate"
        }, {
            text: "外来施工单位消防安全协议",
            id: "fireforeignpact"
        }]
    }, {
        text: "消防检查记录",
        child: [{
            text: "月巡查记录",
            id: "moninspection"
        }, {
            text: "月巡查反馈记录",
            id: "monfeedback"
        }, {
            text: "月巡查复查记录",
            id: "monreview"
        }, {
            text: "专项检查记录",
            id: "specialcheck"
        }, {
            text: "专项检查反馈记录",
            id: "spefeedback"
        }, {
            text: "专项检查复查记录",
            id: "spereview"
        }, {
            text: "重点防火部位检查记录",
            id: "firerecord"
        }, {
            text: "重点防火部位反馈记录",
            id: "firefeedback"
        }, {
            text: "重点放火部位复查记录",
            id: "firereview"
        }, {
            text: "重大火灾隐患检查记录",
            id: "blazerecord"
        }, {
            text: "重大火灾隐患反馈记录",
            id: "blazefeedback"
        }, {
            text: "重大火灾隐患复查记录",
            id: "blazereview"
        }]
    }, {
        text: "消防宣传培训",
        child: [{
            text: "宣传报道",
            id: "publicityreport"
        }, {
            text: "外派培训",
            id: "expatriatetra"
        }, {
            text: "单位培训",
            id: "unittrain"
        }, {
            text: "外来施工单位培训",
            id: "foreigntrain"
        }]
    }, {
        text: "消防安全专业工作月报表",
        id: "firemonthreport"
    }, {
        text: "建筑消防设施完好过程控制季报表",
        id: "fireseasonreport"
    }, {
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
        text: "动火作业许可证",
        id: "firepermit"
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