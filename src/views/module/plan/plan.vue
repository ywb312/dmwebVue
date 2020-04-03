<template>
    <div class="plan">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <component ref="child" :is="currentView" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
import myPlan from "@/components/plan/myPlan.vue";
import searchPlan from "@/components/plan/searchPlan.vue";
import special from "@/components/plan/special.vue";
export default {
    name: "plan",
    data() {
        return {
            //动态组件名
            currentView: "myPlan",
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "检查计划",
                    ajaxurl: "biz/sc/checkplan/list.action"
                },
                {
                    text: "计划查询",
                    ajaxurl: "biz/sc/checkplan/getChildPlanRecord.action",
                },
                {
                    text: "专项检查计划",
                    ajaxurl: "biz/sc/checkplantemp/list.action",
                }
            ]
        };
    },
    created() {
        let a = this.$route.query.a;
        this.pageData = this.page[a]; //当前页面的配置
        switch (a) {
            case "0":
                this.currentView = "myPlan";
                break;
            case "1":
                this.currentView = "searchPlan";
                break;
            case "2":
                this.currentView = "special";
                break;
            default:
                break;
        }
    },
    methods: {},
    components: {
        myPlan,
        searchPlan,
        special
    }
};
</script>
<style scoped>
.plan {
    height: 100%;
}
</style>