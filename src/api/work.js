import axios from "./http"

function taskList(data) {
    return axios.post("/manager/activity/taskList.action", data);
}


export default {
    taskList,
}