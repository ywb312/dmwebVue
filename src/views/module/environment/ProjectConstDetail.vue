<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="项目建设详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper wrap">
            <div class="main">
                <div>
                    <p>项目名称: {{selectData.projname}}</p>
                </div>
                <div>
                    <p>项目类型: {{selectData.projtype}}</p>
                </div>
                <div>
                    <p>建设内容: {{selectData.consontent}}</p>
                </div>
                <div>
                    <p>投资金额: {{selectData.invesamount}}</p>
                </div>
                <div>
                    <p>进展情况: {{selectData.progress}}</p>
                </div>
                <div>
                    <p>立项时间: {{selectData.projecttime}}</p>
                </div>
                <div>
                    <p>开工时间: {{selectData.starttime}}</p>
                </div>
                <div>
                    <p>工期: {{selectData.constperiod}}</p>
                </div>
                <div>
                    <p>竣工时间: {{selectData.comptime}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ProjectConstDetail",
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