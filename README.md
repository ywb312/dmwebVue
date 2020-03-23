## vue.config.js 反向代理
    将本地vue服务端口/dmweb代理为localhost:8080/dmweb(后台服务端口)  可访问localhost:8080下的接口 不会发生跨域问题

## module为最初的12个模块详情页,每个子页面详情都在其data中(还包括页面列表的格式和获取列表的url)
    通知公告 -- 'inform'
	隐患管理 -- 'danger'
	计划管理 -- 'plan'
	提醒预警 -- 'remind'
	风险管理 -- 'risk'
	三项人员 -- 'person'
	方针目标 -- 'target'
	教育培训 -- 'education'
	工艺管理 -- 'technology'
	环保管理 -- 'environment'
	应急管理 -- 'emergency'
	事故管理 -- 'accident'
    如需修改功能的名称,功能在store/index.js和module其功能名文件夹 功能文件下同时修改

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