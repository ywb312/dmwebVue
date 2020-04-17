<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="许可作业申请、审批详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <div class="main">
                <div>
                    <p>安排作业单位: {{selectData.apdanwei}}</p>
                </div>
                <div>
                    <p>作业名称: {{selectData.workname}}</p>
                </div>
                <div>
                    <p>施工单位: {{selectData.sgdanwei}}</p>
                </div>
                <div>
                    <p>预计作业开始时间: {{selectData.worktimes}}</p>
                </div>
                <div>
                    <p>预计作业结束时间: {{selectData.worktimee}}</p>
                </div>
                <div>
                    <p>作业具体方案: {{selectData.workscheme}}</p>
                </div>
                <div>
                    <p>计划单位负责人: {{selectData.planman}}</p>
                </div>
                <div>
                    <p>编制人: {{selectData.aurhorized}}</p>
                </div>
                <div>
                    <p>编制时间: {{selectData.aurhorizetime}}</p>
                </div>
                <div>
                    <p>审批意见: {{selectData.doexpinfo}}</p>
                </div>
                <div>
                    <p>审批部门: {{selectData.doexpdanwei}}</p>
                </div>
                <div>
                    <p>审批人: {{selectData.doexpman}}</p>
                </div>
                <div>
                    <p>审批时间: {{selectData.doexptime}}</p>
                </div>
                <div>
                    <p>
                        附件名称:
                        <a
                            :href="selectData.attach?selectData.attach:''"
                        >{{selectData.attachname}}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "permissionDetail",
    data() {
        return {};
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>