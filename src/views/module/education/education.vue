<template>
    <div class="education">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrap">
            <component ref="child" :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "education",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "培训计划管理(消防)",
                    components: "traplan",
                    element: "YS002"
                },
                {
                    text: "培训计划管理(环保)",
                    components: "traplan",
                    element: "YS001"
                },
                {
                    text: "培训计划管理(安全)",
                    components: "traplan",
                    element: "YS003"
                },
                {
                    text: "考试"
                },
                {
                    text: "考试结果"
                },
                {
                    text: "我的考试结果"
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
        traplan: resolve => require(["@/components/education/traplan"], resolve)
    }
};
</script>
<style scoped>
.education {
    height: 100%;
}
</style>