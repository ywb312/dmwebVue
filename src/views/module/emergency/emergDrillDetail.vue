<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header :title="title" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper wrap">
            <div v-if="$route.query.type=='1'" class="main">
                <div>
                    <p>演练名称: {{selectData.plantitle}}</p>
                </div>
                <div>
                    <p>演练类型: {{selectData.plantypeText}}</p>
                </div>
                <div>
                    <p>预案名称: {{selectData.sortname}}</p>
                </div>
                <div>
                    <p>演练时间: {{selectData.plantime}}</p>
                </div>
                <div>
                    <p>演练地点: {{selectData.planplace}}</p>
                </div>
                <div>
                    <p>演练级别: {{selectData.drillrule == "YLJB001"?"公司级":"车间级"}}</p>
                </div>
                <div>
                    <p>组织部门: {{selectData.orgdept}}</p>
                </div>
                <div>
                    <p>演练状态: {{selectData.drillstage}}</p>
                </div>
                <div>
                    <p>制定人: {{selectData.makeman}}</p>
                </div>
                <div>
                    <p>制定时间: {{selectData.maketime}}</p>
                </div>
                <div>
                    <p>制定单位: {{selectData.remark}}</p>
                </div>
            </div>
            <div v-if="$route.query.type=='2'" class="main">
                <div>
                    <p>演练名称: {{selectData.plantitle}}</p>
                </div>
                <div>
                    <p>演练类型: {{selectData.plantype}}</p>
                </div>
                <div>
                    <p>预案名称: {{selectData.sortname}}</p>
                </div>
                <div>
                    <p>演练时间: {{selectData.plantime}}</p>
                </div>
                <div>
                    <p>演练地点: {{selectData.planplace}}</p>
                </div>
                <div>
                    <p>演练级别: {{selectData.drillrule}}</p>
                </div>
                <div>
                    <p>记录时间: {{selectData.recordtime}}</p>
                </div>
                <div>
                    <p>评价状态: {{selectData.pager}}</p>
                </div>
                <div>
                    <p>提交状态: {{selectData.submitstatus}}</p>
                </div>
            </div>
            <div v-if="$route.query.type=='3'" class="main">
                <div>
                    <p>演练名称: {{selectData.plantitle}}</p>
                </div>
                <div>
                    <p>演练类型: {{selectData.plantype}}</p>
                </div>
                <div>
                    <p>预案名称: {{selectData.sortname}}</p>
                </div>
                <div>
                    <p>演练时间: {{selectData.drilltime}}</p>
                </div>
                <div>
                    <p>演练地点: {{selectData.planplace}}</p>
                </div>
                <div>
                    <p>演练级别: {{selectData.drillrule}}</p>
                </div>
                <div>
                    <p>组织部门: {{selectData.orgdept}}</p>
                </div>
                <div>
                    <p>总指挥: {{selectData.conductor}}</p>
                </div>
                <div>
                    <p>提交状态: {{selectData.submitstatus}}</p>
                </div>
            </div>
            <div v-if="$route.query.type=='4'" class="main">
                <div>
                    <p>资源名称: {{selectData.materialmodule}}</p>
                </div>
                <div>
                    <p>资源类型: {{selectData.materialtypeText}}</p>
                </div>
                <div>
                    <p>规格参数: {{selectData.materialpara}}</p>
                </div>
                <div>
                    <p>数量/单位: {{selectData.materialnums+"/"+selectData.materialunitText}}</p>
                </div>
                <div>
                    <p>存放地点: {{selectData.storeplace}}</p>
                </div>
                <div>
                    <p>责任单位: {{selectData.respdept}}</p>
                </div>
                <div>
                    <p>责任人: {{selectData.respman}}</p>
                </div>
                <div>
                    <p>出厂日期: {{selectData.materialborn}}</p>
                </div>
                <div>
                    <p>下次检查日期: {{selectData.materialcheck}}</p>
                </div>
                <div>
                    <p>状态: {{selectData.submitstatus}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "emergDrillDetail",
    data() {
        return {
            title: ""
        };
    },
    created() {
        if (this.$route.query.type == "1") {
            this.title = "应急演练方案详情";
        } else if (this.$route.query.type == "2") {
            this.title = "应急演练记录详情";
        } else if (this.$route.query.type == "3") {
            this.title = "应急演练评价详情";
        } else if (this.$route.query.type == "4") {
            this.title = "应急资源登记详情";
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>