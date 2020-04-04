import axios from '../http'
// 风险的   获取列表
function getRisk(data) { //风险点新增
    return axios.post("biz/risk/info/list.action", data);
}
// 风险点   新增
function riskAdd(data) { //风险点新增
    return axios.post("biz/risk/info/doAddSave.action", data);
}
// 风险点   修改
function riskModify(data) { //风险点修改
    return axios.post("biz/risk/info/doModifySave.action", data);
}
// 风险点   删除
function riskDelete(data) { //风险点删除
    return axios.post("biz/risk/info/delete.action", data);
}

// 危险源   查看列表
function getCompanyRisk(data) {
    return axios.post("biz/risk/companyRisk/list.action", data);
}
// 危险源   新增
function companyRiskAdd(data) {
    return axios.post("biz/risk/companyRisk/doAddSave.action", data);
}
// 危险源   修改
function companyRiskModify(data) {
    return axios.post("biz/risk/companyRisk/doModifySave.action", data);
}
// 危险源   删除
function companyRiskDelete(data) {
    return axios.post("biz/risk/companyRisk/delete.action", data);
}

export default {
    getRisk,
    riskAdd,
    riskModify,
    riskDelete,
    getCompanyRisk,
    companyRiskAdd,
    companyRiskModify,
    companyRiskDelete,
}