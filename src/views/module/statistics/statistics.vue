<template>
    <div class="page">
        <!-- 主体 -->
        <component :is="pageData.components" :pageData="pageData"></component>
    </div>
</template>
<script>
export default {
    name: "statistics",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "风险统计",
                    id: "riskSta"
                },
                {
                    text: "隐患数据统计",
                    id: "leaderView"
                },
                {
                    text: "隐患排查统计",
                    id: "checkStatistics"
                },
                {
                    text: "隐患信息统计",
                    id: "troubleStatistics"
                },
                {
                    text: "可能发生的事故统计",
                    id: "accident"
                },
                {
                    text: "车间隐患统计",
                    id: "deptStatistics"
                },
                {
                    text: "按时间统计",
                    id: "timeStatistics"
                },
                {
                    text: "按上报人数统计",
                    id: "personStatistics"
                },
                {
                    text: "按账号统计",
                    id: "loginPerson"
                },
                {
                    text: "按隐患名称统计",
                    id: "troubleNmae"
                },
                {
                    text: "按不同单位同台设备统计",
                    id: "devName"
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
                    if (!item.components) {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 风险统计
        riskSta: resolve =>
            require(["@/components/statistics/views/riskSta.vue"], resolve),
        // 隐患数据统计
        // leaderView: resolve =>
        //     require(["@/components/statistics/views/leaderView"], resolve),
        // 隐患排查统计
        checkStatistics: resolve =>
            require(["@/components/statistics/views/checkStatistics"], resolve),
        // 隐患信息统计
        troubleStatistics: resolve =>
            require([
                "@/components/statistics/views/troubleStatistics"
            ], resolve),
        // 可能发生的事故统计
        accident: resolve =>
            require(["@/components/statistics/views/accident"], resolve),
        // 车间隐患统计
        deptStatistics: resolve =>
            require(["@/components/statistics/views/deptStatistics"], resolve),
        // 按时间统计
        timeStatistics: resolve =>
            require(["@/components/statistics/views/timeStatistics"], resolve),
        // 按上报人数统计
        personStatistics: resolve =>
            require([
                "@/components/statistics/views/personStatistics"
            ], resolve),
        // 按账号统计
        loginPerson: resolve =>
            require(["@/components/statistics/views/loginPerson"], resolve),
        // 按隐患名称统计
        troubleNmae: resolve =>
            require(["@/components/statistics/views/troubleNmae"], resolve),
        // 按不同单位同台设备统计
        devName: resolve =>
            require(["@/components/statistics/views/devName"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>