## vue.config.js 反向代理
    将本地vue服务端口/dmweb代理为localhost:8080/dmweb(后台服务端口)  可访问localhost:8080下的接口 不会发生跨域问题
    将api的http.js中的baseURL "dmweb"替换为"localhost:8080/dmweb"

## module为模块详情页,每个子页面详情都在其data中(还包括页面列表的格式和获取列表的url)
    通知公告 -- 'inform'
	隐患管理 -- 'danger'
	计划管理 -- 'plan'
	提醒预警 -- 'remind'
	风险管理 -- 'risk'
	作业现场 -- 'person'
	方针目标 -- 'target'
	教育培训 -- 'education'
	工艺管理 -- 'technology'
	环保管理 -- 'environment'
	应急管理 -- 'emergency'
	事故管理 -- 'accident'
	法律法规 -- 'laws'
	设备设施 -- 'facility'
	组织保障 -- 'team'
	职业卫生 -- 'health'
	安全环保投入 -- 'inject'
	消防管理 -- 'fire'
	绩效考核 -- 'performance'
    如需修改功能的名称,功能在store/index.js和module其功能名文件夹 功能文件下同时修改

## 开发的通用设置
    颜色:#2585cf

## 接口格式 
    let data = eval("(" + res + ")");

## 将tree由父id并列数组转换为层级关系的children数组对象
toTree(data) {
    // 删除 所有 nodes,以防止多次调用
    data.forEach(function(item) {
        delete item.children;
    });

    let map = {};
    // 将数据存储为 以key是id item是value的map索引数据列
    data.forEach(function(item) {
        map[item.id] = item;
    });

    let val = [];
    data.forEach(function(item) {
        // 以当前遍历项,的parentId,去map对象中找到索引的id
        let parent = map[item.pid]; // 如果找到索引,那么说明此项不在顶级当中,那么需要把此项添加到,他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引id,那么直接把 当前的item添加到 val结果集中,作为顶级
            val.push(item);
        }
    });
    return val;
}

## 去除浏览器默认滚动条
::-webkit-scrollbar {
    width: 0px;
}

## 所有risk,danger一级页面为组件，其余新增、详情..等需要跳转的二级页面都是路由,其余共用一个组件
## technology(生产工艺)后端不是同一个接口,不分element;前端不分开,共用一个页面


## 遗留问题
检查记录详情planDetail 落实条件
计划管理 我的计划

inform  通知公告
    详情
    操作弹出框显示条件
    增删改查

<!-- plan    我的计划
    专项检查计划 -->

accident 事故管理
    事故详情跳转（功能不够）

emergency 应急管理
    应急演练记录    详情评价状态未知

team    组织保障管理
    FileApprove 审批无数据
    MeetingInfo 会议纪要发布 接口问题

health后用弹窗来查看详情
    体检结果 搜索框
    职业卫生检测
        放射源放射性监测 子表类别没有   是否合格判断
        all 是否超限

<!-- inject 安全投入
    未根据已有年份 设置搜索范围 -->

remind 提醒预警
    检查逾期预警 一键取消未开发
    
performance
    安全体系自评 子表未区分(一级/二级/三级)

# 待开发 
    安全教育培训 设备设施
# 上线注意事项
    1.App.vue create注释打开 解决vuex刷新问题
    2.App.vue 加载中动画的显示