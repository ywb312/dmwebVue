import axios from './http'

function login (data){
    return axios.post('main/login.action',data);
}

export default {
    login
}