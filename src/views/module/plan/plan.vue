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
            <component ref="child" :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "plan",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "检查计划",
                    id: "myPlan",
                    components: "myPlan"
                },
                {
                    text: "计划查询",
                    id: "scdetail",
                    components: "searchPlan"
                },
                {
                    text: "专项检查计划",
                    id: "special",
                    components: "special"
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
        myPlan: resolve => require(["@/components/plan/myPlan.vue"], resolve),
        searchPlan: resolve =>
            require(["@/components/plan/searchPlan.vue"], resolve),
        special: resolve => require(["@/components/plan/special.vue"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>