<template>
    <div class="change">
        <component :is="currentTabComponent" :postData="postData"></component>
    </div>
</template>
<script>
import zczg from "@/components/work/zczg";
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
            default:
                break;
        }
        this.postData = {
            "variable.keys": "nodepass,comments",
            "variable.types": "B,S",
            bussinessid: this.selcetData.bussinesskey,
            taskId: this.selcetData.id,
            taskDefinitionKey: this.selcetData.taskDefinitionKey,
            nodeaction: this.selcetData.nodeaction,
            bussinesskey: this.selcetData.bussinesskey,
            processInstanceId: this.selcetData.processInstanceId,
            processDefinitionId: this.selcetData.processDefinitionId,
            startUserId: this.selcetData.startUserId,
            sbfs: 2
        };
    },
    computed: {
        selcetData() {
            return this.$store.state.selcetData;
        }
    },
    components: {
        zczg
    }
};
</script>