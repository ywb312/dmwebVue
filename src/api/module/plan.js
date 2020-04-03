
import axios from '../http'

function doDetail(data) { //安全检查提交隐患
    return axios.post("biz/sc/checkplan/doDetail.action", data);
}

export default {
    doDetail,
}