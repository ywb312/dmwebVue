<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "emergency",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "应急预案维护(环保)",
                    id: "emergplanlist1"
                },
                {
                    text: "应急预案维护(消防)",
                    id: "emergplanlist2"
                },
                {
                    text: "应急预案维护(安全)",
                    id: "emergplanlist3"
                },
                {
                    text: "应急预案审批(环保)",
                    id: "emergplancreate1"
                },
                {
                    text: "应急预案审批(消防)",
                    id: "emergplancreate2"
                },
                {
                    text: "应急预案审批(安全)",
                    id: "emergplancreate3"
                },
                {
                    text: "应急救援队伍信息(环保)",
                    id: "emergagency1"
                },
                {
                    text: "应急救援队伍信息(消防)",
                    id: "emergagency2"
                },
                {
                    text: "应急救援队伍信息(安全)",
                    id: "emergagency3"
                },
                {
                    text: "应急演练方案(环保)",
                    id: "drillplan1"
                },
                {
                    text: "应急演练方案(消防)",
                    id: "drillplan2"
                },
                {
                    text: "应急演练方案(安全)",
                    id: "drillplan3"
                },
                {
                    text: "应急演练记录(环保)",
                    id: "drillrecord1"
                },
                {
                    text: "应急演练记录(消防)",
                    id: "drillrecord2"
                },
                {
                    text: "应急演练记录(安全)",
                    id: "drillrecord3"
                },
                {
                    text: "应急演练评价(环保)",
                    id: "drillevaluate1"
                },
                {
                    text: "应急演练评价(消防)",
                    id: "drillevaluate2"
                },
                {
                    text: "应急演练评价(安全)",
                    id: "drillevaluate3"
                },
                {
                    text: "应急资源登记(环保)",
                    id: "materialinfo1"
                },
                {
                    text: "应急资源登记(消防)",
                    id: "materialinfo2"
                },
                {
                    text: "应急资源登记(安全)",
                    id: "materialinfo3"
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
                    let i = id.charAt(id.length - 1);
                    item.components = id.substring(0, id.length - 1);
                    item.element = "YS00" + i;
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 应急预案维护
        emergplanlist: resolve =>
            require(["@/components/emergency/views/EmergPlanList"], resolve),
        // 应急预案审批
        emergplancreate: resolve =>
            require(["@/components/emergency/views/EmergPlanCreate"], resolve),
        // 应急救援队伍信息
        emergagency: resolve =>
            require(["@/components/emergency/views/EmergAgency"], resolve),
        // 应急演练方案
        drillplan: resolve =>
            require(["@/components/emergency/views/DrillPlan"], resolve),
        // 应急演练记录  //详情页评价状态未知
        drillrecord: resolve =>
            require(["@/components/emergency/views/DrillRecord"], resolve),
        // 应急演练评价
        drillevaluate: resolve =>
            require(["@/components/emergency/views/DrilleValuate"], resolve),
        // 应急资源登记 //报废状态怎么判断
        materialinfo: resolve =>
            require(["@/components/emergency/views/MaterialInfo"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>