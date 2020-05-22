<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            :title="pageData.text"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <component :is="pageData.components" :pageData="pageData"></component>
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
                    // window.localStorage["roleLevel"] == "1"
                    //     ? "班组级风险辨识"
                    //     : "车间/厂级风险辨识",
                    id: "info",
                    components: "plantRisk"
                },
                {
                    text:
                        window.localStorage["roleLevel"] == "4"
                            ? "安环部审核"
                            : window.localStorage["roleLevel"] == "3"
                            ? "厂级审核"
                            : "车间级审核",
                    id: "auditpj",
                    components: "audit"
                },
                {
                    text: "车间级汇总上报",
                    id: "reportrisk",
                    components: "collect"
                },
                {
                    text: "厂级汇总上报",
                    id: "reporpjtrisk",
                    components: "collect"
                },
                {
                    text: "风险清单",
                    id: "riskreport",
                    components: "riskList"
                },
                {
                    text: "风险比较图",
                    id: "fxwxytj",
                    components: "riskChart"
                },
                {
                    text: "安全风险公告栏",
                    id: "ggl",
                    components: "riskBoard"
                },
                {
                    text: "岗位告知卡",
                    id: "gzk",
                    components: "informCard"
                },
                {
                    text: "二级危险源汇总",
                    id: "twoOnrisk",
                    components: "twoOnrisk"
                },
                {
                    text: "安环部修订",
                    id: "revise",
                    components: "revise"
                }
            ]
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach(item => {
                if (item.id == id) {
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        plantRisk: resolve => require(["@/components/risk/plantRisk"], resolve),
        riskList: resolve => require(["@/components/risk/riskList"], resolve),
        audit: resolve => require(["@/components/risk/audit"], resolve),
        collect: resolve => require(["@/components/risk/collect"], resolve),
        riskChart: resolve => require(["@/components/risk/riskChart"], resolve),
        riskBoard: resolve => require(["@/components/risk/riskBoard"], resolve),
        informCard: resolve =>
            require(["@/components/risk/informCard"], resolve),
        twoOnrisk: resolve => require(["@/components/risk/twoOnrisk"], resolve),
        revise: resolve => require(["@/components/risk/revise"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>