import axios from './http'

function doAddSaveSingle (data){//安全检查提交隐患
    return axios.post("biz/sc/checkplandetail/doAddSaveSingle.action",data);
}
function getExePlan (data){//获取检查计划内容
    return axios.post("biz/sc/checkplan/getExePlan.action",data);
}
function doAddSave (data){3.//提交检查结果
    return axios.post("biz/sc/checkplandetail/doAddSave.action",data);
}

function completenodyTask (data){
    //9.待办事项-自查自改
    //10.待办事项-整改
    //11.待办事项-一般隐患验
    //12.待办事项-收到报上来
    //待办事项-收到报上来
    return axios.post("biz/sc/ybyhActiviti/completenodyTask.action",data);
}

export default {
    doAddSaveSingle,
    getExePlan,
    doAddSave,
    completenodyTask,
}