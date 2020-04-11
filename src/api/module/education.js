import axios from '../http'

function getTraTable(data) {
    return axios.post("biz/operate/tra/traplanmana/list.action", data);
}
export default {
    getTraTable
}