<template>
    <div class="technology page">
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
        <div class="wrap">
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "technology",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "重大安全环保项目申请",
                    id: "apply1"
                },
                {
                    text: "职业卫生项目的申请",
                    id: "apply2"
                },
                // {
                //     text: "安全预评价报告备案",
                //     id: "record1"
                // },
                // {
                //     text: "环保预评价报告备案",
                //     id: "record2"
                // },
                {
                    text: "安全环保设施设计审查",
                    id: "examine1"
                },
                {
                    text: "职业卫生设施设计审查",
                    id: "examine2"
                },
                {
                    text: "消防项目设计审查",
                    id: "examine3"
                },
                {
                    text: "安全环保设施竣工验收信息",
                    id: "completed1"
                },
                {
                    text: "职业卫生设施竣工验收信息",
                    id: "completed2"
                },
                {
                    text: "消防项目竣工验收信息",
                    id: "completed3"
                },
                {
                    text: "水泵检查记录",
                    id: "draincheck1"
                },
                {
                    text: "水泵排水记录",
                    id: "draininfo"
                },
                {
                    text: "水仓检查记录",
                    id: "draincheck2"
                },
                {
                    text: "水仓清淤记录",
                    id: "dibholedesilt"
                },
                {
                    text: "供电线路维护",
                    id: "powermaintain"
                },
                {
                    text: "变电室检查",
                    id: "powerroomcheck"
                },
                {
                    text: "顶板分级信息",
                    id: "roofgrading"
                },
                {
                    text: "采空区分布信息",
                    id: "taskdistributioninfo"
                },
                {
                    text: "采空区监控信息",
                    id: "taskmonitorinfo"
                },
                {
                    text: "通风安全管理",
                    id: "prodaeration"
                },
                {
                    text: "运输线路检查记录",
                    id: "transrecord1"
                },
                {
                    text: "提升运输设备设施检测检验报告",
                    id: "transrecord2"
                },
                {
                    text: "系统监测数据添加、查看",
                    id: "monitordata"
                },
                {
                    text: "系统检查结果添加、查看",
                    id: "checkresult"
                },
                {
                    text: "六大系统设备设施的检查、维护",
                    id: "equfailure"
                }
            ]
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        // 处理数据 展示相同页面根据pageData.element=1/2/3传参调用不同的接口
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach(item => {
                if (item.id == id) {
                    let i = id.charAt(id.length - 1);
                    if (!isNaN(i * 1)) {
                        item.components = id.substring(0, id.length - 1);
                        item.element = i;
                    } else {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 项目三同时管理
        // 项目申请
        apply: resolve =>
            require(["@/components/technology/views/TechonlogyApply"], resolve),
        // // 预评价报告备案
        // record: resolve =>
        //     require([
        //         "@/components/technology/views/TechonlogyRecord"
        //     ], resolve),
        // 设施设计审查
        examine: resolve =>
            require([
                "@/components/technology/views/TechonlogyExamine"
            ], resolve),
        // 设施竣工验收信息
        completed: resolve =>
            require([
                "@/components/technology/views/TechonlogyCompleted"
            ], resolve),
        // 排水安全管理
        // 检查记录
        draincheck: resolve =>
            require([
                "@/components/technology/views/TechonlogyDrainCheck"
            ], resolve),
        draininfo: resolve =>
            require([
                "@/components/technology/views/TechonlogyDrainInfo"
            ], resolve),
        dibholedesilt: resolve =>
            require([
                "@/components/technology/views/TechonlogyDredging"
            ], resolve),
        // 供电安全管理
        // 供电线路维护
        powermaintain: resolve =>
            require([
                "@/components/technology/views/TechonlogyPowerMaintain"
            ], resolve),
        // 变电室检查 和检查计划 计划详情一样
        powerroomcheck: resolve =>
            require([
                "@/components/technology/views/TechonlogyPowerRoomCheck"
            ], resolve),
        // 顶板,采空区管理
        // 顶板分级信息
        roofgrading: (
            resolve //评估状态
        ) =>
            require([
                "@/components/technology/views/TechonlogyRoofGrading"
            ], resolve),
        // 采空区分布信息
        taskdistributioninfo: resolve =>
            require([
                "@/components/technology/views/TechonlogyGoafInfo"
            ], resolve),
        // 采空区监控信息
        taskmonitorinfo: resolve =>
            require([
                "@/components/technology/views/TechonlogyGoafWatch"
            ], resolve),
        // 通风安全管理
        prodaeration: resolve =>
            require([
                "@/components/technology/views/TechonlogyVentilation"
            ], resolve),
        // 提升运输安全管理
        transrecord: resolve =>
            require([
                "@/components/technology/views/TechonlogyTransRecord"
            ], resolve),
        // 安全避险“六大系统”安全管理
        // 系统监测数据添加、查看
        monitordata: resolve =>
            require([
                "@/components/technology/views/TechonlogyMonitorData"
            ], resolve),
        // 系统检查结果添加、查看
        checkresult: resolve =>
            require([
                "@/components/technology/views/TechonlogyCheckResult"
            ], resolve),
        // 六大系统设备设施的检查、维护
        equfailure: resolve =>
            require([
                "@/components/technology/views/TechonlogyEqufailure"
            ], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>