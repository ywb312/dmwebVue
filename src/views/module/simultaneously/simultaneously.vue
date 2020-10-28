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
                    text: "完成的建设项目的汇总统计",
                    id: "safeapplyCount",
                },
                {
                    text: "安全项目申请",
                    id: "safeapply",
                    param: {
                        type: "",
                    },
                },
                {
                    text: "安全预评价报告评审批复",
                    id: "safeevaluate",
                },
                {
                    text: "安全设施设计审查批复",
                    id: "safeexamine",
                },
                {
                    text: "安全设施竣工验收报告",
                    id: "safecheck",
                },
                {
                    text: "完成的建设项目的汇总统计",
                    id: "occupapplyCount",
                },
                {
                    text: "职业卫生项目申请",
                    id: "occupapply",
                    param: {
                        type: "",
                    },
                },
                {
                    text: "职业卫生预评价报告批复",
                    id: "occupevaluate",
                },
                {
                    text: "职业卫生防护设施设计审查批复",
                    id: "occhealthreview",
                },
                {
                    text: "职业卫生控制效果评价报告",
                    id: "occacceptinfo",
                },
                {
                    text: "完成的建设项目的汇总统计",
                    id: "environapplyCount",
                },
                {
                    text: "环保项目申请",
                    id: "environapply",
                    param: {
                        type: "",
                    },
                },
                {
                    text: "项目立项批复、项目备案",
                    id: "envevaluate",
                },
                {
                    text: "环评文本、批复",
                    id: "firedesignreview",
                },
                {
                    text: "验收意见",
                    id: "firecompletioninfo",
                },
                {
                    text: "水土保持设计方案",
                    id: "maintainexamine",
                },
                {
                    text: "水土保持竣工验收",
                    id: "maintaincheck",
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
        // 完成的建设项目的汇总统计
        safeapplyCount: (resolve) =>
            require([
                "@/components/simultaneously/views/safe/safeapplyCount",
            ], resolve),
        // 安全项目申请
        safeapply: (resolve) =>
            require([
                "@/components/simultaneously/views/safe/safeapply",
            ], resolve),
        // 安全预评价报告评审批复
        safeevaluate: (resolve) =>
            require([
                "@/components/simultaneously/views/safe/safeevaluate",
            ], resolve),
        // 安全设施设计审查批复
        safeexamine: (resolve) =>
            require([
                "@/components/simultaneously/views/safe/safeexamine",
            ], resolve),
        // 安全设施竣工验收报告
        safecheck: (resolve) =>
            require([
                "@/components/simultaneously/views/safe/safecheck",
            ], resolve),
        // 完成的建设项目的汇总统计
        occupapplyCount: (resolve) =>
            require([
                "@/components/simultaneously/views/occup/occupapplyCount",
            ], resolve),
        // 职业卫生项目申请
        occupapply: (resolve) =>
            require([
                "@/components/simultaneously/views/occup/occupapply",
            ], resolve),
        // 职业卫生预评价报告批复
        occupevaluate: (resolve) =>
            require([
                "@/components/simultaneously/views/occup/occupevaluate",
            ], resolve),
        // 职业卫生防护设施设计审查批复
        occhealthreview: (resolve) =>
            require([
                "@/components/simultaneously/views/occup/occhealthreview",
            ], resolve),
        // 职业卫生控制效果评价报告
        occacceptinfo: (resolve) =>
            require([
                "@/components/simultaneously/views/occup/occacceptinfo",
            ], resolve),
        // 完成的建设项目的汇总统计
        environapplyCount: (resolve) =>
            require([
                "@/components/simultaneously/views/environ/environapplyCount",
            ], resolve),
        // 环保项目申请
        environapply: (resolve) =>
            require([
                "@/components/simultaneously/views/environ/environapply",
            ], resolve),
        // 项目立项批复、项目备案
        envevaluate: (resolve) =>
            require([
                "@/components/simultaneously/views/environ/envevaluate",
            ], resolve),
        // 环评文本、批复
        firedesignreview: (resolve) =>
            require([
                "@/components/simultaneously/views/environ/firedesignreview",
            ], resolve),
        // 验收意见
        firecompletioninfo: (resolve) =>
            require([
                "@/components/simultaneously/views/environ/firecompletioninfo",
            ], resolve),

        // 水土保持设计方案
        maintainexamine: (resolve) =>
            require([
                "@/components/simultaneously/views/maintainexamine",
            ], resolve),
        // 水土保持竣工验收
        maintaincheck: (resolve) =>
            require([
                "@/components/simultaneously/views/maintaincheck",
            ], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>