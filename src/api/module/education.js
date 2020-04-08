import axios from '../http'

function getTraplan(data) { //安全检查提交隐患
    return axios.post("biz/operate/tra/traplan/list.action", data);
}

function getTraTable(data){
    return axios.post("biz/operate/tra/traplanmana/list.action", data);
}
export default {
    getTraplan,
    getTraTable
}