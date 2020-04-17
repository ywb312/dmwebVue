<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="交接班详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <div class="main">
                <div>
                    <p>班组名称: {{selectData.classteamname}}</p>
                </div>
                <div>
                    <p>班次: {{selectData.classesText}}</p>
                </div>
                <div>
                    <p>班组长: {{selectData.classteamer}}</p>
                </div>
                <div>
                    <p>主持人: {{selectData.hostman}}</p>
                </div>
                <div>
                    <p>参会领导: {{selectData.leaders}}</p>
                </div>
                <div>
                    <p>应到人数: {{selectData.shouldcomenumber}}</p>
                </div>
                <div>
                    <p>实到人数: {{selectData.actuallycomenumber}}</p>
                </div>
                <div>
                    <p>记录人: {{selectData.creater}}</p>
                </div>
                <div>
                    <p>记录时间: {{selectData.createtime}}</p>
                </div>
                <div>
                    <p>提交状态: {{selectData.issubmit=="0"?"未提交":"已提交"}}</p>
                </div>
                <div>
                    <p>
                        会议照片:
                        <img class="navImg" :src="selectData.image" alt="加载失败" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "replaceDetail",
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