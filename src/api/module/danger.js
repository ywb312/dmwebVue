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

export default {
    doAddSaveSingle,
    getExePlan,
    doAddSave,
    detail,
    getHicomments,
    doexp,
}