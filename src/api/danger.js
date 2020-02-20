import axios from './http'

function doAddSaveSingle (data){//安全检查提交隐患
    return axios.post("biz/sc/checkplandetail/doAddSaveSingle.action",data);
}
function getExePlan (data){//获取检查计划内容
    return axios.post("biz/sc/checkplan/getExePlan.action",data);
}
function doAddSave (data){3.//提交检查结果
    return axios.post("biz/sc/checkplandetail/doAddSave.action",data);
}
function getHicomments (data){//隐患处理审批记录
    return axios.post("manager/activity/getHicomments.action",data);
}
function doexp (data){
    //选择将隐患自查自改
    //选择将隐患上报上级(需要有上级)
    //选择将隐患指派
    return axios.post("biz/sc/ybyhActiviti/doexp.action",data);
}

function detail (data){//隐患详情
    return axios.post("biz/im/zdrisknotice/detail.action",data);
}
function completenodyTask (data){
    //9.待办事项-自查自改
    //10.待办事项-整改
    //11.待办事项-一般隐患验
    //12.待办事项-收到报上来
    //待办事项-收到报上来
    return axios.post("biz/sc/ybyhActiviti/completenodyTask.action",data);
}

export default {
    doAddSaveSingle,
    getExePlan,
    doAddSave,
    getHicomments,
    doexp,
    detail,
    completenodyTask,
}