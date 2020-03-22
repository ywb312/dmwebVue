import axios from './http'

// 请求页面列表数据
function showPage (url,data){
    return axios.post(url,data);
}

// 获取组织机构
function getTree (){
    return axios.post("/manager/sys/dept/tree4.action");
}

export default {
    showPage,
    getTree,
}