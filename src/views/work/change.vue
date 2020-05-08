<template>
    <div class="change">
        <component :is="currentTabComponent" :postData="postData"></component>
    </div>
</template>
<script>
import zczg from "@/components/work/change/zczg";
import db from "@/components/work/change/db";
export default {
    name: "change",
    data() {
        return {
            currentTabComponent: "",
            postData: {}
        };
    },
    created() {
        switch (this.$route.query.type) {
            case "zczg":
                this.currentTabComponent = "zczg";
                break;
            case "db":
                this.currentTabComponent = "db";
                break;
            default:
                break;
        }
        this.$api.pub
            .showPage("/manager/sys/dept/getDeptByUser.action", {
                startUserId: this.selectData.startUserId
            })
            .then(res => {
                this.postData = {
                    bussinessid: this.selectData.bussinesskey,
                    taskId: this.selectData.id,
                    taskDefinitionKey: this.selectData.taskDefinitionKey,
                    nodeaction: this.selectData.nodeaction,
                    bussinesskey: this.selectData.bussinesskey,
                    processInstanceId: this.selectData.processInstanceId,
                    processDefinitionId: this.selectData.processDefinitionId,
                    startUserId: this.selectData.startUserId,
                    sbfs: 2,
                    "bean.crqy": res.deptId
                };
            });
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {
        zczg,
        db
    }
};
</script>