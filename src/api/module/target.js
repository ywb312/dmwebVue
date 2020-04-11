import axios from '../http'
//安全生产方针
function getpatpolicyList(data) {
    return axios.post("biz/operate/patpolicy/list.action", data);
}
export default {
    getpatpolicyList,
}