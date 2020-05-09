<template>
    <div class="change">
        <component :is="currentTabComponent" :postData="postData"></component>
    </div>
</template>
<script>
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
            case "zpzg":
                this.currentTabComponent = "zpzg";
                break;
            case "zpys":
                this.currentTabComponent = "zpys";
                break;
            case "sb":
                this.currentTabComponent = "sb";
                break;
            case "jkaqhbb":
                this.currentTabComponent = "jkaqhbb";
                break;
            case "db":
                this.currentTabComponent = "db";
                break;
            case "zg":
                this.currentTabComponent = "zpzg";
                break;
            case "ys":
                this.currentTabComponent = "zpys";
                break;
            case "bh":
                this.currentTabComponent = "bh";
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
        zczg: resolve => require(["@/components/work/change/zczg"], resolve),
        zpzg: resolve => require(["@/components/work/change/zpzg"], resolve),
        zpys: resolve => require(["@/components/work/change/zpys"], resolve),
        sb: resolve => require(["@/components/work/change/sb"], resolve),
        jkaqhbb: resolve =>
            require(["@/components/work/change/jkaqhbb"], resolve),
        db: resolve => require(["@/components/work/change/db"], resolve),
        bh: resolve => require(["@/components/work/change/bh"], resolve)
    }
};
</script>