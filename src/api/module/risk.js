import axios from '../http'
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
// 危险源   新增评价
function approveAdd(data) {
    return axios.post("biz/risk/pj/doAddSave.action", data);
}

// 管控措施 新增
function measureAdd(data) {
    return axios.post("biz/risk/companyriskinspect/doAddSave.action", data);
}
// 管控措施 修改
function measureModify(data) {
    return axios.post("biz/risk/companyriskinspect/doModifySave.action", data);
}
// 管控措施 删除
function measureDelete(data) {
    return axios.post("biz/risk/companyriskinspect/delete.action", data);
}

// 排查频率 新增
function examineAdd(data) {
    return axios.post("biz/risk/rate/doAddSave.action", data);
}
// 排查频率 删除
function examineDelete(data) {
    return axios.post("biz/risk/rate/delete.action?actiontype=delete", data);
}

// 安环部审核通过
function auidtPassAn(data) {
    return axios.post("biz/risk/detail/pjpass.action", data);
}

// 非安环部审核通过
function auditPass(data) {
    return axios.post("biz/risk/companyRiskdept/doModifySave.action", data);
}
// 非安环部审核不通过
function auditNoPass(data) {
    return axios.post("biz/risk/companyRiskdept/nopass.action", data);
}

// 风险公告栏 修改信息
function riskBoardModify(data) {
    return axios.post("biz/risk/companyRiskdept/doinfoSave.action?actiontype=modifysave", data);
}
export default {
    riskAdd,
    riskModify,
    riskDelete,
    companyRiskAdd,
    companyRiskModify,
    companyRiskDelete,
    approveAdd,
    measureAdd,
    measureModify,
    measureDelete,
    examineAdd,
    examineDelete,
    auidtPassAn,
    auditPass,
    auditNoPass,
    riskBoardModify,
}