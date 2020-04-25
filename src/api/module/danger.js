import axios from '../http'
function doAddSaveSingle(data) { //安全检查提交隐患
    return axios.post("biz/sc/checkplandetail/doAddSaveSingle.action", data);
}

function getExePlan(data) { //获取检查计划内容
    return axios.post("biz/sc/checkplan/getExePlan.action", data);
}

function doAddSave(data) {
    3. //提交检查结果
    return axios.post("biz/sc/checkplandetail/doAddSave.action", data);
}

function detail(data) { //4.隐患详情
    return axios.post("biz/im/zdrisknotice/detail.action", data);
}

function getHicomments(data) { //5.审批记录
    return axios.post("manager/activity/getHicomments.action", data);
}

function doexp(data) { //6.自查自改/上报/指派
    return axios.post("biz/sc/ybyhActiviti/doexp.action", data);
}

function completenodyTask(data) {
    //5.待办事项-自查自改
    //6.待办事项-整改
    //7.待办事项-指派
    //8.待办事项-上报
    //9.待办事项-评估
    //9.待办事项-督办
    //9.待办事项-闭环
    //9.待办事项-验收
    return axios.post("biz/sc/ybyhActiviti/completenodyTask.action", data);
}

export default {
    doAddSaveSingle,
    getExePlan,
    doAddSave,
    detail,
    getHicomments,
    completenodyTask,
    doexp,
}