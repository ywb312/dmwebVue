import axios from "./http"

// 登录
function login(data) {
    return axios.post("main/login.action", data);
}

// 动态url和动态data
function showPage(url, data) {
    return axios.post(url, data);
}

function getConfig(url) {
    return axios.get(url);
}

// 获取组织机构
function getTree() {
    return axios.post("/manager/sys/dept/tree4.action");
}

// 上传文件
function doupfile(data, config) {
    return axios.post("/manager/sys/upfile/doupfile.action", data, config);
}

// 获取数据字典
function comboboxList(data, config) {
    return axios.post("/pub/select/dict/comboboxList.action", data);
}

export default {
    login,
    showPage,
    getConfig,
    getTree,
    doupfile,
    comboboxList
}