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
            <component
                :is="pageData.components"
                :pageData="pageData"
                @choiseComponent="choiseComponent"
            ></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "simultaneously",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "安全“三同时”建设项目的汇总统计",
                    id: "safeapplyCount",
                },
                {
                    text: "职业卫生“三同时”建设项目的汇总统计",
                    id: "occupapplyCount",
                },
                {
                    text: "环保“三同时”建设项目的汇总统计",
                    id: "environapplyCount",
                },
                {
                    text: "水土保持设计方案的汇总统计",
                    id: "maintainexamineCount",
                },
                {
                    text: "水土保持竣工验收的汇总统计",
                    id: "maintaincheckCount",
                },
                {
                    text: "安全“三同时”建设项目工作汇总",
                    id: "safeapplySum",
                },
                {
                    text: "职业卫生“三同时”建设项目工作汇总",
                    id: "occupapplySum",
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
                    if (!item.components) {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        },
        // 切换组件
        choiseComponent(obj) {
            this.pageData = obj;
        },
    },
    components: {
        // 安全“三同时”建设项目的汇总统计
        safeapplyCount: (resolve) =>
            require([
                "@/components/simultaneously/views/safeapplyCount",
            ], resolve),
        // 职业卫生“三同时”建设项目的汇总统计
        occupapplyCount: (resolve) =>
            require([
                "@/components/simultaneously/views/occupapplyCount",
            ], resolve),
        // 环保“三同时”建设项目的汇总统计
        environapplyCount: (resolve) =>
            require([
                "@/components/simultaneously/views/environapplyCount",
            ], resolve),
        // 安全“三同时”建设项目的汇总统计   子表
        safeapply: (resolve) =>
            require(["@/components/simultaneously/views/safeapply"], resolve),
        // 职业卫生“三同时”建设项目的汇总统计   子表
        occupapply: (resolve) =>
            require(["@/components/simultaneously/views/occupapply"], resolve),
        // 环保“三同时”建设项目的汇总统计   子表
        environapply: (resolve) =>
            require([
                "@/components/simultaneously/views/environapply",
            ], resolve),
        // 水土保持设计方案的汇总统计
        maintainexamineCount: (resolve) =>
            require([
                "@/components/simultaneously/views/maintainexamineCount",
            ], resolve),
        // 水土保持竣工验收的汇总统计
        maintaincheckCount: (resolve) =>
            require([
                "@/components/simultaneously/views/maintaincheckCount",
            ], resolve),
        // 水土保持设计方案的汇总统计   子表
        maintainexamine: (resolve) =>
            require([
                "@/components/simultaneously/views/maintainexamine",
            ], resolve),
        // 水土保持竣工验收的汇总统计   子表
        maintaincheck: (resolve) =>
            require([
                "@/components/simultaneously/views/maintaincheck",
            ], resolve),
        // 安全“三同时”建设项目工作汇总
        safeapplySum: (resolve) =>
            require([
                "@/components/simultaneously/views/safeapplySum",
            ], resolve),
        // 职业卫生“三同时”建设项目工作汇总
        occupapplySum: (resolve) =>
            require([
                "@/components/simultaneously/views/occupapplySum",
            ], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>