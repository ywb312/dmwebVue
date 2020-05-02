<template>
    <div class="page">
        <component :is="pageData.components" :pageData="pageData"></component>
    </div>
</template>
<script>
export default {
    name: "danger",
    data() {
        return {
            pageData: "",
            page: [
                {
                    text: "隐患处理",
                    id: "zdrisknotice"
                },
                {
                    text: "隐患详情查询",
                    id: "processrisk"
                },
                {
                    text: "重大隐患评估记录",
                    id: "zdriskassess"
                },
                {
                    text: "重大隐患督办记录",
                    id: "zdriskfeet"
                },
                {
                    text: "隐患整改指令记录",
                    id: "zdriskreform"
                },
                {
                    text: "隐患申请复查记录",
                    id: "zdriskreview"
                },
                {
                    text: "隐患验收结果记录",
                    id: "zdriskaccept"
                },
                {
                    text: "重大隐患闭环记录",
                    id: "zdriskclose"
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
                    item.components = item.id;
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 隐患处理
        zdrisknotice: resolve =>
            require(["@/components/danger/view/dealDanger"], resolve),
        // 隐患详情查询
        processrisk: resolve =>
            require(["@/components/danger/view/ProcessRisk"], resolve),
        // 重大隐患评估记录
        zdriskassess: resolve =>
            require(["@/components/danger/view/ZDRiskAssess"], resolve),
        // 重大隐患督办记录
        zdriskfeet: resolve =>
            require(["@/components/danger/view/ZDRiskFeet"], resolve),
        // 隐患整改指令记录
        zdriskreform: resolve =>
            require(["@/components/danger/view/ZDRiskReform"], resolve),
        // 隐患申请复查记录
        zdriskreview: resolve =>
            require(["@/components/danger/view/ZDRiskReview"], resolve),
        // 隐患验收结果记录
        zdriskaccept: resolve =>
            require(["@/components/danger/view/ZDRiskAccept"], resolve),
        // 重大隐患闭环记录
        zdriskclose: resolve =>
            require(["@/components/danger/view/ZDRiskClose"], resolve)
    },
    beforeRouteLeave(to, from, next) {
        if (to.name != "list") {
            //不是list , 缓存
            from.meta.keepAlive = true;
        } else {
            //list列表页,不缓存
            from.meta.keepAlive = false;
            this.$destroy();
        }
        next();
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>