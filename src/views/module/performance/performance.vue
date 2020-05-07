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
    name: "performance",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                { text: "绩效测量计划提交", id: "safejxsubmit" },
                { text: "绩效评审", id: "safejxreview" },
                { text: "新建自评计划", id: "evalplan" },
                { text: "标准化自评评分", id: "doscorerules" },
                { text: "标准化要素项维护", id: "items" },
                { text: "标准化自评版本信息维护", id: "version" },
                { text: "标准化自评事实", id: "evalfacts" }
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
                    if (!item.components) {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 绩效测量计划提交
        safejxsubmit: resolve =>
            require(["@/components/performance/views/jxSubmit"], resolve),
        // 绩效评审
        safejxreview: resolve =>
            require(["@/components/performance/views/jxReview"], resolve),
        // 新建自评计划
        evalplan: resolve =>
            require(["@/components/performance/views/EvalPlan"], resolve),
        // 标准化自评评分
        doscorerules: resolve =>
            require(["@/components/performance/views/ScoreRules"], resolve),
        // 标准化要素项维护
        items: resolve =>
            require(["@/components/performance/views/Items"], resolve),
        // 标准化自评版本信息维护
        version: resolve =>
            require(["@/components/performance/views/Version"], resolve),
        // 标准化自评事实
        evalfacts: resolve =>
            require(["@/components/performance/views/EvalFacts"], resolve),
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>