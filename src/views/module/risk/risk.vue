<template>
    <div class="risk">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <component ref="child" :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "risk",
    data() {
        return {
            //动态组件名
            currentView: "riskList",
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "风险辨识",
                    components: "plantRisk"
                },
                {
                    text: "安环部审核",
                    components: "audit"
                },
                {
                    text: "车间级汇总上报",
                    components: "collect",
                    ajaxUrl: "biz/risk/info/selectreportlist.action",
                    upUrl: "biz/risk/audit/doallaudit.action"
                },
                {
                    text: "厂级汇总上报",
                    components: "collect",
                    ajaxUrl: "biz/risk/companyRisk/reportpjlist.action",
                    upUrl: "biz/risk/audit/doAddgSave.action"
                },
                {
                    text: "风险清单",
                    components: "riskList"
                },
                {
                    text: "风险比较图",
                    components: "riskChart"
                },
                {
                    text: "安全风险公告栏",
                    components: "riskBoard"
                },
                {
                    text: "岗位告知卡",
                    components: "informCard"
                }
            ]
        };
    },
    created() {
        let a = this.$route.query.a;
        this.pageData = this.page[a]; //当前页面的配置
    },
    methods: {},
    components: {
        plantRisk: resolve => require(["@/components/risk/plantRisk"], resolve),
        riskList: resolve => require(["@/components/risk/riskList"], resolve),
        audit: resolve => require(["@/components/risk/audit"], resolve),
        collect: resolve => require(["@/components/risk/collect"], resolve),
        riskChart: resolve => require(["@/components/risk/riskChart"], resolve),
        riskBoard: resolve => require(["@/components/risk/riskBoard"], resolve),
        informCard: resolve =>
            require(["@/components/risk/informCard"], resolve)
    }
};
</script>
<style scoped>
.risk {
    height: 100%;
}
</style>