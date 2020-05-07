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
    name: "target",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "安全生产方针发布、修订(环保)",
                    id: "patpolicy1"
                },
                {
                    text: "安全生产方针发布、修订(消防)",
                    id: "patpolicy2"
                },
                {
                    text: "安全生产方针发布、修订(安全)",
                    id: "patpolicy3"
                },
                {
                    text: "安全生产方针意见征集(环保)",
                    id: "patopinion1",
                    components: "patopinion"
                },
                {
                    text: "安全生产方针意见征集(消防)",
                    id: "patopinion2"
                },
                {
                    text: "安全生产方针意见征集(安全)",
                    id: "patopinion3"
                },
                {
                    text: "安全生产目标意见征集(环保)",
                    id: "opinionobj1"
                },
                {
                    text: "安全生产目标意见征集(消防)",
                    id: "opinionobj2"
                },
                {
                    text: "安全生产目标意见征集(安全)",
                    id: "opinionobj3"
                },
                {
                    text: "企业安全生产目标发布修订(环保)",
                    id: "annualobj1"
                },
                {
                    text: "企业安全生产目标发布修订(消防)",
                    id: "annualobj2"
                },
                {
                    text: "企业安全生产目标发布修订(安全)",
                    id: "annualobj3"
                },
                {
                    text: "安全生产目标分解(环保)",
                    id: "thinobj1"
                },
                {
                    text: "安全生产目标分解(消防)",
                    id: "thinobj2"
                },
                {
                    text: "安全生产目标分解(安全)",
                    id: "thinobj3"
                },
                {
                    text: "安全生产目标考核(环保)",
                    id: "assessmentobj1"
                },
                {
                    text: "安全生产目标考核(消防)",
                    id: "assessmentobj2"
                },
                {
                    text: "安全生产目标考核(安全)",
                    id: "assessmentobj3"
                },
                {
                    text: "环保措施计划(环保)",
                    id: "envmeasure1"
                },
                {
                    text: "环保措施计划(消防)",
                    id: "envmeasure2"
                },
                {
                    text: "环保措施计划(安全)",
                    id: "envmeasure3"
                },
                {
                    text: "年度环保工作计划(环保)",
                    id: "envYearWorkPlan1"
                },
                {
                    text: "年度环保工作计划(消防)",
                    id: "envYearWorkPlan2"
                },
                {
                    text: "年度环保工作计划(安全)",
                    id: "envYearWorkPlan3"
                },
                {
                    text: "环境方针目标(环保)",
                    id: "envPolicyAims1"
                },
                {
                    text: "环境方针目标(消防)",
                    id: "envPolicyAims2"
                },
                {
                    text: "环境方针目标(安全)",
                    id: "envPolicyAims3"
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
    computed: {},
    components: {
        // 安全生产方针
        patpolicy: resolve =>
            require(["@/components/target/patpolicy"], resolve),
        patopinion: resolve =>
            require(["@/components/target/patopinion"], resolve),
        opinionobj: resolve =>
            require(["@/components/target/opinionobj"], resolve),
        // 安全生产目标
        annualobj: resolve =>
            require(["@/components/target/annualobj"], resolve),
        thinobj: resolve => require(["@/components/target/thinobj"], resolve),
        assessmentobj: resolve =>
            require(["@/components/target/assessmentobj"], resolve),
        // 环保目标方针
        envmeasure: resolve =>
            require(["@/components/target/envmeasure"], resolve),
        envYearWorkPlan: resolve =>
            require(["@/components/target/envYearWorkPlan"], resolve),
        envPolicyAims: resolve =>
            require(["@/components/target/envPolicyAims"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>