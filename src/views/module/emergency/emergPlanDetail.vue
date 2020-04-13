<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="应急预案详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper wrap">
            <div class="main">
                <div>
                    <p>文件名称: {{selectData.filename}}</p>
                </div>
                <div>
                    <p>文件编号: {{selectData.filecode}}</p>
                </div>
                <div>
                    <p>要素号: {{selectData.elemcode}}</p>
                </div>
                <div>
                    <p>创建单位: {{selectData.createdept}}</p>
                </div>
                <div>
                    <p>创建人员: {{selectData.createman}}</p>
                </div>
                <div>
                    <p>创建时间: {{selectData.createtime}}</p>
                </div>
                <div>
                    <p>文件级别: {{selectData.filedegree}}</p>
                </div>
                <div>
                    <p>年限: {{selectData.year}}</p>
                </div>
                <div>
                    <p>任务状态: {{selectData.releastate == "FPZT001"?"未分配":"已分配"}}</p>
                </div>
                <div>
                    <p>创建状态: {{selectData.createstage}}</p>
                </div>
                <div>
                    <p>发布时间: {{selectData.pubtime}}</p>
                </div>
                <div>
                    <p>修改时间: {{selectData.lastmoditime}}</p>
                </div>
                <div>
                    <p>模板名: {{selectData.templatename}}</p>
                </div>
                <div>
                    <p>责任人: {{selectData.respname}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "emergPlanDetail",
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