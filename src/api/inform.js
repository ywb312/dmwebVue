import axios from './http'

function showPage (url,data){
    return axios.post(url,data);
}

export default {
    showPage
}