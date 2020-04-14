<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="事故详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper wrap">
            <van-divider
                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
            >基本信息</van-divider>
            <div class="main">
                <div>
                    <p>事故名称: {{selectData.acciname}}</p>
                </div>
                <div>
                    <p>事故单位: {{selectData.inchargeid}}</p>
                </div>
                <div>
                    <p>事故类别: {{selectData.categoryText}}</p>
                </div>
                <div>
                    <p>事故等级: {{selectData.acciclassidText}}</p>
                </div>
                <div>
                    <p>事故发生时间: {{selectData.happentime}}</p>
                </div>
                <div>
                    <p>事故发生地点: {{selectData.happenplace}}</p>
                </div>
                <div>
                    <p>事故单位负责人: {{selectData.inchargeid}}</p>
                </div>
                <div>
                    <p>事故单位单位: {{selectData.inchargeid}}</p>
                </div>
                <div>
                    <p>初步原因分析: {{selectData.createmanid}}</p>
                </div>
                <div>
                    <p>事故简要经过: {{selectData.acciprocess}}</p>
                </div>
                <div>
                    <p>事故现场情况: {{selectData.situation}}</p>
                </div>
                <div>
                    <p>已采取措施: {{selectData.other}}</p>
                </div>
            </div>
            <van-divider
                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', margin:'4px 0'}"
            >直接经济损失初步估计</van-divider>
            <div class="main">
                <div>
                    <p>损失金额: {{selectData.financialloss}}元</p>
                </div>
            </div>

            <!-- <div>
                <p>轻伤{{selectData.minorcount}}人</p>
                <p>重伤{{selectData.seriouscount}}人</p>
                <p>失踪{{selectData.misscount}}人</p>
                <p>死亡{{selectData.deathcount}}人</p>
            </div>-->
        </div>
    </div>
</template>
<script>
export default {
    name: "accidentDetail",
    data() {
        return {
            title: ""
        };
    },
    created() {},
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>