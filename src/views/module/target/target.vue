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
                    text: "矿山安全生产方针",
                    id: "patpolicy3",
                },
                {
                    text: "矿山环境方针",
                    id: "patpolicy2",
                },
                {
                    text: "矿山安全生产及消防目标",
                    id: "annualobj3",
                },
                {
                    text: "矿山安全生产及消防目标实施计划",
                    id: "envmeasure2",
                },
                {
                    text: "矿山安全生产及消防目标实施的考核结果",
                    id: "envYearWorkPlan2",
                },
                {
                    text: "矿山环保目标",
                    id: "envPolicyAims3",
                },
                {
                    text: "矿山环保目标实施计划",
                    id: "envmeasure3",
                },
                {
                    text: "矿山环保目标实施的考核结果",
                    id: "envYearWorkPlan3",
                },
            ],
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach((item) => {
                if (item.id == id) {
                    let i = id.charAt(id.length - 1);
                    item.components = id.substring(0, id.length - 1);
                    item.element = "YS00" + i;
                    this.pageData = item;
                }
            });
        },
    },
    computed: {},
    components: {
        // 安全生产方针
        patpolicy: (resolve) =>
            require(["@/components/target/patpolicy"], resolve),
        // 安全生产目标
        annualobj: (resolve) =>
            require(["@/components/target/annualobj"], resolve),
        // 环保目标方针
        envmeasure: (resolve) =>
            require(["@/components/target/envmeasure"], resolve),
        envYearWorkPlan: (resolve) =>
            require(["@/components/target/envYearWorkPlan"], resolve),
        envPolicyAims: (resolve) =>
            require(["@/components/target/envPolicyAims"], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>