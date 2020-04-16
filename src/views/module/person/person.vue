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
    name: "person",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "特种人员管理",
                    id: "specialPeople"
                },
                {
                    text: "持证上岗人员",
                    id: "certifiedPeople"
                },
                // {
                //     text: "特种作业人员培训计划",
                //     id: "traproject"
                // },
                // {
                //     text: "特种作业人员培训记录",
                //     id: "trarecord"
                // },
                // {
                //     text: "特种作业人员培训结果",
                //     id: "trasummary"
                // },
                {
                    text: "许可作业清单录入",
                    id: "permissioninfo"
                },
                {
                    text: "安全操作规程",
                    id: "safetypro"
                },
                {
                    text: "许可作业申请、审批",
                    id: "permissionapply"
                },
                {
                    text: "任务观察记录录入",
                    id: "taskobserve"
                },
                {
                    text: "作业指导书",
                    id: "operinstruc"
                },
                {
                    text: "工作票的申请",
                    id: "operationticket"
                },
                {
                    text: "工作票执行总结",
                    id: "worksummary"
                },
                {
                    text: "劳动防护用品发放记录",
                    id: "articleRecord"
                },
                {
                    text: "劳动防护用品需求调查",
                    id: "articlesurvey"
                },
                {
                    text: "劳动防护用品评估",
                    id: "articleevaluate"
                },
                {
                    text: "劳动防护用品发放使用标准",
                    id: "articleStandard"
                },
                {
                    text: "带班计划",
                    id: "leaderplan"
                },
                {
                    text: "带班交接记录",
                    id: "leaderrecord"
                },
                {
                    text: "外来人员下井记录",
                    id: "outsiderManage"
                },
                {
                    text: "外来人员安全培训记录",
                    id: "outsidertrain"
                },
                {
                    text: "地质灾害检查",
                    id: "geologyCheck"
                },
                {
                    text: "危险化学品库存",
                    id: "dangerousIn"
                },
                {
                    text: "危险化学品领用",
                    id: "dangerousOut"
                },
                {
                    text: "交接班记录",
                    id: "classMeettingInfo"
                },
                {
                    text: "安全标志申请界面",
                    id: "safetySignApply"
                },
                {
                    text: "安全标志发放登记",
                    id: "safetySignOffer"
                },
                {
                    text: "照明设施配备清单",
                    id: "illuminecabinet"
                },
                {
                    text: "照明设施检查记录",
                    id: "illuminecheck"
                },
                {
                    text: "防灭火器器材配置记录",
                    id: "hydcabinet"
                },
                {
                    text: "防灭火器器材更换记录",
                    id: "hydrant"
                },
                {
                    text: "中深孔爆破申请(全部)",
                    id: "taskblastappinfo"
                },
                {
                    text: "井下作业面安全确认项维护",
                    id: "taskworksafetyconfirmitems"
                },
                {
                    text: "安全标志标识库",
                    id: "tasksafemarkinfo"
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
    // 特种人员管理，持证上岗人员，许可作业申请、审批，工作票申请，劳动防护用品发放记录，劳动防护用品发放使用标准，带班交接记录，交接班记录,安全标志申请界面，安全标志发放登记，照明设施配备清单，防灭火器器材配置记录
    components: {
        // // 特种人员管理
        specialPeople: resolve =>
            require(["@/components/person/views/SpecialPeople"], resolve),
        // // 持证上岗人员
        certifiedPeople: resolve =>
            require(["@/components/person/views/CertifiedPeople"], resolve),
        // // 特种作业人员培训计划
        // traproject: resolve =>
        //     require(["@/components/person/views/PublicNotify"], resolve),
        // // 特种作业人员培训记录
        // trarecord: resolve =>
        //     require(["@/components/person/views/PublicNotify"], resolve),
        // // 特种作业人员培训结果
        // trasummary: resolve =>
        //     require(["@/components/person/views/PublicNotify"], resolve),
        // 许可作业清单录入
        permissioninfo: resolve =>
            require(["@/components/person/views/PermissionInfo"], resolve),
        // // 安全操作规程
        safetypro: resolve =>
            require(["@/components/person/views/SafeOperation"], resolve),
        // 许可作业申请、审批
        permissionapply: resolve =>
            require(["@/components/person/views/PermissionApply"], resolve),
        // 任务观察记录录入
        taskobserve: resolve =>
            require(["@/components/person/views/TaskObserve"], resolve),
        // 作业指导书
        operinstruc: resolve =>
            require(["@/components/person/views/OperationInstruc"], resolve),
        // 工作票的申请
        operationticket: resolve =>
            require(["@/components/person/views/OperationTicket"], resolve),
        // 工作票执行总结
        worksummary: resolve =>
            require(["@/components/person/views/WorkSummary"], resolve),
        // 劳动防护用品发放记录
        articleRecord: resolve =>
            require(["@/components/person/views/ArticleRecord"], resolve),
        // // 劳动防护用品需求调查
        articlesurvey: resolve =>
            require(["@/components/person/views/ArticleSurvey"], resolve),
        // 劳动防护用品评估
        articleevaluate: resolve =>
            require(["@/components/person/views/ArticleEvaluate"], resolve),
        // 劳动防护用品发放使用标准
        articleStandard: resolve =>
            require(["@/components/person/views/ArticleStandard"], resolve),
        // // 带班计划
        leaderplan: resolve =>
            require(["@/components/person/views/LeaderPlan"], resolve),
        // // 带班交接记录
        leaderrecord: resolve =>
            require(["@/components/person/views/LeaderRecord"], resolve),
        // 外来人员下井记录
        outsiderManage: resolve =>
            require(["@/components/person/views/OutsiderManage"], resolve),
        // 外来人员安全培训记录
        outsidertrain: resolve =>
            require(["@/components/person/views/OutsiderTrain"], resolve),
        // // 地质灾害检查
        geologyCheck: resolve =>
            require(["@/components/person/views/GeologyCheck"], resolve),
        // 危险化学品库存
        dangerousIn: resolve =>
            require(["@/components/person/views/DangerousIn"], resolve),
        // 危险化学品领用
        dangerousOut: resolve =>
            require(["@/components/person/views/DangerousOut"], resolve),
        // 交接班记录
        classMeettingInfo: resolve =>
            require(["@/components/person/views/ClassMeettingInfo"], resolve),
        // // 安全标志申请界面
        safetySignApply: resolve =>
            require(["@/components/person/views/SafetySignApply"], resolve),
        // 安全标志发放登记                 提交状态？
        safetySignOffer: resolve =>
            require(["@/components/person/views/SafetySignOffer"], resolve),
        // 照明设施配备清单
        illuminecabinet: resolve =>
            require(["@/components/person/views/IllumineCabinet"], resolve),
        // 照明设施检查记录
        illuminecheck: resolve =>
            require(["@/components/person/views/IllumineCheck"], resolve),
        // 防灭火器器材配置记录
        hydcabinet: resolve =>
            require(["@/components/person/views/HydrantConfig"], resolve),
        // 防灭火器器材更换记录               状态?
        hydrant: resolve =>
            require(["@/components/person/views/HydrantChange"], resolve),
        // 中深孔爆破申请(全部)
        taskblastappinfo: resolve =>
            require(["@/components/person/views/TaskBlastApply"], resolve),
        // 井下作业面安全确认项维护
        taskworksafetyconfirmitems: resolve =>
            require(["@/components/person/views/TaskWorkSafety"], resolve),
        // 安全标志标识库
        tasksafemarkinfo: resolve =>
            require(["@/components/person/views/TaskSafeMark"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>