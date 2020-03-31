import axios from "./http"

// 动态url和动态data
function showPage(url, data) {
    return axios.post(url, data);
}

// 获取组织机构
function getTree() {
    return axios.post("/manager/sys/dept/tree4.action");
}

function login(data) {
    return axios.post("main/login.action", data);
}

function doupfile(data, config) {
    return axios.post("/manager/sys/upfile/doupfile.action", data, config);
}

export default {
    login,
    showPage,
    getTree,
    doupfile,
}