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
        //     text: "风险清单",
        //     id: "riskreport",
        // }, {
        text: "风险比较图",
        id: "fxwxytj",
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
    title: "职业卫生",
    path: "health",
    page: [{
        text: "职业病危害因素年度检测",
        child: [{
            text: "职业病危害因素统计",
            id: "healthfactor"
        }, {
            text: "职业病危害检测计划发布",
            id: "healthplan"
        }]
    }, {
        text: "职业病危害因素监测数据录入",
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
        }]
    }, {
        text: "禁忌症人员清单",
        child: [{
            text: "禁忌症人员清单",
            id: "checkAbnormalCount"
        }]
    }, {
        text: "职业健康检查结果汇总",
        child: [{
            text: "职业健康检查结果汇总",
            id: "checkResultCount"
        }]
    }, {
        text: "接触职业病危害因素汇总",
        child: [{
            text: "接触职业病危害因素汇总",
            id: "healthfactorsum"
        }]
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
}, {
    title: "项目三同时管理",
    path: "simultaneously",
    page: [{
        text: "安全“三同时”建设项目的汇总统计",
        child: [{
            text: "安全“三同时”建设项目的汇总统计",
            id: "safeapplyCount"
        }]
    }, {
        text: "职业卫生“三同时”建设项目的汇总统计",
        child: [{
            text: "职业卫生“三同时”建设项目的汇总统计",
            id: "occupapplyCount"
        }]
    }, {
        text: "环保“三同时”建设项目的汇总统计",
        child: [{
            text: "环保“三同时”建设项目的汇总统计",
            id: "environapplyCount"
        }]
    }, {
        text: "水土保持",
        child: [{
            text: "水土保持设计方案的汇总统计",
            id: "maintainexamineCount"
        }, {
            text: "水土保持竣工验收的汇总统计",
            id: "maintaincheckCount"
        }]
    }, {
        text: "安全“三同时”建设项目工作汇总",
        child: [{
            text: "安全“三同时”建设项目工作汇总",
            id: "safeapplySum"
        }]
    }, {
        text: "职业卫生“三同时”建设项目工作汇总",
        child: [{
            text: "职业卫生“三同时”建设项目工作汇总",
            id: "occupapplySum"
        }]
    }, ]
}]