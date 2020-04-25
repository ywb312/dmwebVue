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
    name: "health",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "公司员工信息登记表",
                    id: "companyinfo"
                },
                {
                    text: "项目部员工信息登记表",
                    id: "projectinfo"
                },
                {
                    text: "外来单位参观检查人员信息表",
                    id: "outsideinfo"
                },
                {
                    text: "炸药库人员信息登记表",
                    id: "explosiveinfo"
                },
                {
                    text: "职业卫生在岗培训登记表",
                    id: "hygieneinfo",
                    components: "trainInfo"
                },
                {
                    text: "在岗培训登记表",
                    id: "guardinfo",
                    components: "trainInfo"
                },
                {
                    text: "检修人员登记表",
                    id: "overhaulinfo"
                },
                {
                    text: "清洁工岗前培训登记表",
                    id: "cleaninfo"
                },
                {
                    text: "转岗培训登记表",
                    id: "transferinfo"
                },
                {
                    text: "保卫部人员信息登记表",
                    id: "defendinfo"
                },
                {
                    text: "体检计划",
                    id: "examplan"
                },
                {
                    text: "体检上报",
                    id: "report"
                },
                {
                    text: "体检结果",
                    id: "examdisease"
                },
                {
                    text: "职业健康检查结果汇总",
                    id: "checkResult"
                },
                {
                    text: "职业健康检查异常结果汇总",
                    id: "checkAbnormal"
                },
                {
                    text: "工作场所噪声监测记录",
                    id: "workvoice"
                },
                {
                    text: "放射源放射性监测",
                    id: "radioinfo"
                },
                {
                    text: "生产粉尘浓度检测",
                    id: "dustinfo"
                },
                {
                    text: "水质监测",
                    id: "waterinfo"
                },
                {
                    text: "通风测尘监测记录",
                    id: "ventilateinfo"
                },
                {
                    text: "职业病危害因素监测表（集团公司功能）",
                    id: "harmElement"
                },
                {
                    text: "体检周期维护",
                    id: "examperiod"
                },
                {
                    text: "检测仪器管理",
                    id: "equipinfo"
                },
                {
                    text: "设备设施维护",
                    id: "equip"
                },
                {
                    text: "作业场所职业危害阈值维护",
                    id: "dangernum"
                },
                {
                    text: "水质监测项目维护",
                    id: "waternumber"
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
        // 公司员工信息登记表
        companyinfo: resolve =>
            require(["@/components/health/views/staff/CompanyInfo"], resolve),
        // 项目部员工信息登记表
        projectinfo: resolve =>
            require(["@/components/health/views/staff/ProjectInfo"], resolve),
        // 外来单位参观检查人员信息表
        outsideinfo: resolve =>
            require(["@/components/health/views/staff/OutsideInfo"], resolve),
        // 炸药库人员信息登记表
        explosiveinfo: resolve =>
            require(["@/components/health/views/staff/ExplosiveInfo"], resolve),
        // 职业卫生在岗培训登记表,在岗培训登记表
        trainInfo: resolve =>
            require(["@/components/health/views/staff/TrainInfo"], resolve),
        // 检修人员登记表
        overhaulinfo: resolve =>
            require(["@/components/health/views/staff/OverhaulInfo"], resolve),
        // 清洁工岗前培训登记表
        cleaninfo: resolve =>
            require(["@/components/health/views/staff/CleanInfo"], resolve),
        // 转岗培训登记表
        transferinfo: resolve =>
            require(["@/components/health/views/staff/TransferInfo"], resolve),
        // 保卫部人员信息登记表
        defendinfo: resolve =>
            require(["@/components/health/views/staff/DefendInfo"], resolve),
        // 体检计划
        examplan: resolve =>
            require(["@/components/health/views/health/Examplan"], resolve),
        // 体检上报
        report: resolve =>
            require(["@/components/health/views/health/Report"], resolve),
        // 体检结果
        examdisease: resolve =>
            require(["@/components/health/views/health/ExamDisease"], resolve),
        // 职业健康检查结果汇总
        checkResult: resolve =>
            require(["@/components/health/views/health/CheckResult"], resolve),
        // 职业健康检查异常结果汇总
        checkAbnormal: resolve =>
            require([
                "@/components/health/views/health/CheckAbnormal"
            ], resolve),
        // 工作场所噪声监测记录
        workvoice: resolve =>
            require(["@/components/health/views/test/WorkVoice"], resolve),
        // 放射源放射性监测
        radioinfo: resolve =>
            require(["@/components/health/views/test/RadioInfo"], resolve),
        // 生产粉尘浓度检测
        dustinfo: resolve =>
            require(["@/components/health/views/test/DustInfo"], resolve),
        // 水质监测
        waterinfo: resolve =>
            require(["@/components/health/views/test/WaterInfo"], resolve),
        // 通风测尘监测记录
        ventilateinfo: resolve =>
            require(["@/components/health/views/test/VentilateInfo"], resolve),
        // 职业病危害因素监测表（集团公司功能）
        harmElement: resolve =>
            require(["@/components/health/views/test/HarmElement"], resolve),
        // 体检周期维护
        examperiod: resolve =>
            require(["@/components/health/views/base/ExamPeriod"], resolve),
        // 检测仪器管理
        equipinfo: resolve =>
            require(["@/components/health/views/base/EquipInfo"], resolve),
        // 设备设施维护
        equip: resolve =>
            require(["@/components/health/views/base/Equip"], resolve),
        // 作业场所职业危害阈值维护
        dangernum: resolve =>
            require(["@/components/health/views/base/DangerNum"], resolve),
        // 水质监测项目维护
        waternumber: resolve =>
            require(["@/components/health/views/base/WaterNumber"], resolve),
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>