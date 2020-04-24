<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "fire",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "消防工作记录清单",
                    id: "fireworklist"
                },
                {
                    text: "消防管理制度",
                    id: "firemanage"
                },
                {
                    text: "消防设备设施汇总",
                    id: "fireinfo",
                    element: "YS002"
                },
                // {
                // 	text: "消防器材汇总",
                // 	id: "firecabinet"
                // },
                {
                    text: "消防安全责任书",
                    id: "firesaferespon"
                },
                {
                    text: "消防从业人员资格证汇总",
                    id: "firecertificate"
                },
                {
                    text: "外来施工单位消防安全协议",
                    id: "fireforeignpact"
                },
                {
                    text: "月巡查记录",
                    id: "moninspection",
                    components: "record"
                },
                {
                    text: "月巡查反馈记录",
                    id: "monfeedback",
                    components: "record"
                },
                {
                    text: "月巡查复查记录",
                    id: "monreview",
                    components: "record"
                },
                {
                    text: "专项检查记录",
                    id: "specialcheck",
                    components: "record"
                },
                {
                    text: "专项检查反馈记录",
                    id: "spefeedback",
                    components: "record"
                },
                {
                    text: "专项检查复查记录",
                    id: "spereview",
                    components: "record"
                },
                {
                    text: "重点防火部位检查记录",
                    id: "firerecord",
                    components: "record"
                },
                {
                    text: "重点防火部位反馈记录",
                    id: "firefeedback",
                    components: "record"
                },
                {
                    text: "重点放火部位复查记录",
                    id: "firereview",
                    components: "record"
                },
                {
                    text: "重大火灾隐患检查记录",
                    id: "blazerecord",
                    components: "record"
                },
                {
                    text: "重大火灾隐患反馈记录",
                    id: "blazefeedback",
                    components: "record"
                },
                {
                    text: "重大火灾隐患复查记录",
                    id: "blazereview",
                    components: "record"
                },
                {
                    text: "宣传报道",
                    id: "publicityreport"
                },
                {
                    text: "外派培训",
                    id: "expatriatetra",
                    components:"allTrain"
                },
                {
                    text: "单位培训",
                    id: "unittrain",
                    components:"allTrain"
                },
                {
                    text: "外来施工单位培训",
                    id: "foreigntrain",
                    components:"allTrain"
                },
                {
                    text: "消防安全专业工作月报表",
                    id: "firemonthreport"
                },
                {
                    text: "建筑消防设施完好过程控制季报表",
                    id: "fireseasonreport"
                },
                {
                    text: "人员密集场所登记表",
                    id: "staffdenseplace"
                },
                {
                    text: "易燃易爆场所登记表",
                    id: "dangerplace"
                },
                {
                    text: "重要场所消防验收情况统计",
                    id: "fireaccept"
                },
                {
                    text: "动火作业许可证",
                    id: "firepermit"
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
        // 消防工作记录清单
        fireworklist: resolve =>
            require(["@/components/fire/views/FireWorkList"], resolve),
        // 消防管理制度
        firemanage: resolve =>
            require(["@/components/fire/views/ledger/FireManage"], resolve),
        // 消防设备设施汇总
        fireinfo: resolve =>
            require(["@/components/facility/views/Devlist"], resolve),
        // 消防安全责任书
        firesaferespon: resolve =>
            require(["@/components/fire/views/ledger/FireSafeRespon"], resolve),
        // 消防从业人员资格证汇总
        firecertificate: resolve =>
            require([
                "@/components/fire/views/ledger/FireCertificate"
            ], resolve),
        // 外来施工单位消防安全协议
        fireforeignpact: resolve =>
            require([
                "@/components/fire/views/ledger/FireForeignPact"
            ], resolve),
        // 消防检查记录所有页面
        record: resolve =>
            require(["@/components/fire/views/record/Record"], resolve),
        // 宣传报道
        publicityreport: resolve =>
            require(["@/components/fire/views/train/PublicityReport"], resolve),
        // 消防宣传培训->所有培训页面
        allTrain: resolve =>
            require(["@/components/fire/views/train/AllTrain"], resolve),
        // 消防安全专业工作月报表
        firemonthreport: resolve =>
            require(["@/components/fire/views/FireMonthReport"], resolve),
        // 建筑消防设施完好过程控制季报表
        fireseasonreport: resolve =>
            require(["@/components/fire/views/FireSeasonReport"], resolve),
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>