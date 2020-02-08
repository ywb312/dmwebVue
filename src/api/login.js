import axios from './http'

function login (){
    return axios.post('/login',{
        xx:"Xx",
    });
}

export default {
    login
}