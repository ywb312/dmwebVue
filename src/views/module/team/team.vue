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
    name: "team",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "安全管理体系文件清单维护",
                    id: "filelist",
                    components: "filelist"
                },
                {
                    text: "安全管理体系制度文件审批",
                    id: "filecreate",
                    components: "fileApprove"
                },
                {
                    text: "安全生产责任制清单维护",
                    id: "safprodclist",
                    components: "filelist"
                },
                {
                    text: "安全生产责任制审批",
                    id: "safprodccreate",
                    components: "fileApprove"
                },
                {
                    text: "安全操作规程清单维护",
                    id: "safoperulelist",
                    components: "filelist"
                },
                {
                    text: "安全操作规程审批",
                    id: "safoperulcreate",
                    components: "fileApprove"
                },
                {
                    text: "作业指导书清单维护",
                    id: "opeinstrulist",
                    components: "filelist"
                },
                {
                    text: "作业指导书审批",
                    id: "opeinstrucreate",
                    components: "fileApprove"
                },
                {
                    text: "企业证照",
                    id: "companyLicense"
                },
                {
                    text: "安全生产委员会信息",
                    id: "orgsafetycommitteeinfo",
                    components:"committeeInfo"
                },
                {
                    text: "环境委员会信息",
                    id: "orgenvironcommitteeinfo",
                    components:"committeeInfo"
                },
                {
                    text: "消防管理机构信息",
                    id: "orgfirecontrolinfo",
                    components:"committeeInfo"
                },
                {
                    text: "主要负责人证照",
                    id: "peoplephoto",
                    components:"specialPeople"
                },
                {
                    text: "安全员资质",
                    id: "secoffqua",
                    components:"specialPeople"
                },
                {
                    text: "员工代表",
                    id: "staffrep",
                    components:"specialPeople"
                },
                {
                    text: "事故调查员",
                    id: "accnve",
                    components:"specialPeople"
                },
                {
                    text: "职业卫生管理员",
                    id: "occhealadmin",
                    components:"specialPeople"
                },
                {
                    text: "承包商资质维护",
                    id: "orgcontractor",
                    components:"contractor"
                },
                {
                    text: "承包商安全生产表现评估",
                    id: "orgcontractorCon",
                    components:"contractorCon"
                },
                {
                    text: "承包商资质查看",
                    id: "orgcontractorfile",
                    components:"contractorFile"
                },
                {
                    text: "综合档案",
                    id: "colligate"
                },
                {
                    text: "安全资格证档案",
                    id: "qualifications"
                },
                {
                    text: "职业健康档案",
                    id: "healthexamperiod"
                },
                {
                    text: "违章档案",
                    id: "peccancy"
                },
                {
                    text: "工伤职业病档案",
                    id: "workinjury"
                },
                {
                    text: "安全计划发布",
                    id: "publish"
                },
                {
                    text: "安全计划完成情况评估",
                    id: "evaluate"
                },
                {
                    text: "安全计划完成情况反馈",
                    id: "feedback"
                },
                {
                    text: "会议纪要发布",
                    id: "meetinginfo"
                },
                {
                    text: "会议提出的问题解决措施的跟进",
                    id: "resolvemeasure"
                },
                {
                    text: "安全合理化建议的收集",
                    id: "collect"
                },
                {
                    text: "安全合理化建议的评审奖励",
                    id: "rewards"
                },
                {
                    text: "尾矿库建设信息",
                    id: "tailingjs"
                },
                {
                    text: "尾矿库安全评价信息",
                    id: "tailingevaluate"
                },
                {
                    text: "管理评审计划",
                    id: "systemjudgeplan"
                },
                {
                    text: "管理评审会议记录",
                    id: "systemjudgemeeting"
                },
                {
                    text: "管理评审报告",
                    id: "systemjudgereport"
                },
                {
                    text: "相关方维护",
                    id: "stakeholder"
                },
                {
                    text: "相关方项目部月份从业人员登记",
                    id: "stakeholderMonth"
                },
                {
                    text: "相关方项目部人员统计表",
                    id: "statisticsPeople"
                },
                {
                    text: "相关方单位情况一览表（矿业公司）",
                    id: "stakeholderInfo"
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
                // 文件所有页面都可以共用
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
        // 安全管理体系维护列表
        filelist: resolve =>
            require(["@/components/team/views/FileList"], resolve),
        // 安全管理体系审批列表
        fileApprove: resolve =>
            require(["@/components/team/views/FileApprove"], resolve),
        // 企业证照
        companyLicense: resolve =>
            require(["@/components/team/views/CompanyLicense"], resolve),
        // 安全管理机构信息
        committeeInfo: resolve =>
            require(["@/components/team/views/CommitteeInfo"], resolve),
        // 特殊职务人员信息
        specialPeople:resolve =>
            require(["@/components/team/views/SpecialPeople"], resolve),
        // 承包商资质维护
        contractor:resolve =>
            require(["@/components/team/views/contractor/Contractor"], resolve),
        // 承包商安全生产表现评估
        contractorCon:resolve =>
            require(["@/components/team/views/contractor/ContractorCon"], resolve),
        // 承包商资质查看
        contractorFile:resolve =>
            require(["@/components/team/views/contractor/ContractorFile"], resolve),
        // 综合档案
        colligate:resolve =>
            require(["@/components/team/views/staff/Colligate"], resolve),
        // 安全资格证档案
        qualifications:resolve =>
            require(["@/components/team/views/staff/Qualifications"], resolve),
        // 职业健康档案
        healthexamperiod:resolve =>
            require(["@/components/team/views/staff/HealthExamPeriod"], resolve),
        // 违章档案
        peccancy:resolve =>
            require(["@/components/team/views/staff/Peccancy"], resolve),
        // 工伤职业病档案
        workinjury:resolve =>
            require(["@/components/team/views/staff/WorkInjury"], resolve),
        // 安全计划发布
        publish:resolve =>
            require(["@/components/team/views/safe/Publish"], resolve),
        // 安全计划完成情况评估
        evaluate:resolve =>
            require(["@/components/team/views/safe/Evaluate"], resolve),
        // 安全计划完成情况反馈
        feedback:resolve =>
            require(["@/components/team/views/safe/Feedback"], resolve),
        // 会议纪要发布
        meetinginfo:resolve =>
            require(["@/components/team/views/safe/MeetingInfo"], resolve),
        // 会议提出的问题解决措施的跟进
        resolvemeasure:resolve =>
            require(["@/components/team/views/safe/ResolveMeasure"], resolve),
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>