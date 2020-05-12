import axios from '../http'

function myPlan(data) { //我的检查隐患
    return axios.post("biz/sc/checkplan/getExePlan.action", data);
}

function doDetail(data) { //安全检查提交隐患
    return axios.post("biz/sc/checkplan/doDetail.action", data);
}

export default {
    myPlan,
    doDetail,
}