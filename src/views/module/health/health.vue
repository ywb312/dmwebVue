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
    name: "health",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "职业病危害因素统计",
                    id: "healthfactor",
                },
                {
                    text: "职业病危害检测计划发布",
                    id: "healthplan",
                },
                {
                    text: "工作场所噪声监测记录",
                    id: "workvoice",
                },
                {
                    text: "放射源放射性监测",
                    id: "radioinfo",
                },
                {
                    text: "生产粉尘浓度检测",
                    id: "dustinfo",
                },
                {
                    text: "水质监测",
                    id: "waterinfo",
                },
                {
                    text: "通风测尘监测记录",
                    id: "ventilateinfo",
                },
                {
                    text: "禁忌症人员清单",
                    id: "checkAbnormalCount",
                },
                {
                    text: "职业健康检查结果汇总",
                    id: "checkResultCount",
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
        // 职业病危害因素统计
        healthfactor: (resolve) =>
            require(["@/components/health/views/HealthFactor"], resolve),
        // 职业病危害检测计划发布
        healthplan: (resolve) =>
            require(["@/components/health/views/HealthPlan"], resolve),
        // 工作场所噪声监测记录
        workvoice: (resolve) =>
            require(["@/components/health/views/test/WorkVoice"], resolve),
        // 放射源放射性监测
        radioinfo: (resolve) =>
            require(["@/components/health/views/test/RadioInfo"], resolve),
        // 生产粉尘浓度检测
        dustinfo: (resolve) =>
            require(["@/components/health/views/test/DustInfo"], resolve),
        // 水质监测
        waterinfo: (resolve) =>
            require(["@/components/health/views/test/WaterInfo"], resolve),
        // 通风测尘监测记录
        ventilateinfo: (resolve) =>
            require(["@/components/health/views/test/VentilateInfo"], resolve),
        // 工作场所噪声检测结果 子表
        VoiceResult: (resolve) =>
            require(["@/components/health/views/test/VoiceResult"], resolve),
        // 放射源放射性检测结果 子表
        RadioResult: (resolve) =>
            require(["@/components/health/views/test/RadioResult"], resolve),
        // 生产粉尘浓度检测结果 子表
        DustResult: (resolve) =>
            require(["@/components/health/views/test/DustResult"], resolve),
        // 水质检测结果 子表
        WaterResult: (resolve) =>
            require(["@/components/health/views/test/WaterResult"], resolve),
        // 通风测尘检测结果 子表
        VentilateResult: (resolve) =>
            require([
                "@/components/health/views/test/VentilateResult",
            ], resolve),

        // 禁忌症人员清单
        checkAbnormalCount: (resolve) =>
            require(["@/components/health/views/CheckAbnormalCount"], resolve),
        // 职业健康检查结果汇总
        checkResultCount: (resolve) =>
            require(["@/components/health/views/CheckResultCount"], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>