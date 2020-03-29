import axios from './http'

function taskList (data){
    return axios.post('/manager/activity/taskList.action',data);
}

function finshList (data){
    return axios.post('/pub/tomatter/list.action?filters=CLZT002',data);
}

export default {
    taskList,
    finshList
}