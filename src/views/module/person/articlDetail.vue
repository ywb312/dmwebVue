<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="劳护用品发放详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <div v-if="$route.query.type=='1'" class="main">
                <div>
                    <p>工作服: {{selectData.coveral}}</p>
                </div>
                <div>
                    <p>军用胶鞋: {{selectData.shoes}}</p>
                </div>
                <div>
                    <p>安全帽: {{selectData.safetyhat}}</p>
                </div>
                <div>
                    <p>夏季工作服: {{selectData.summerCoverall}}</p>
                </div>
                <div>
                    <p>秋季工作服: {{selectData.autumnCoverall}}</p>
                </div>
                <div>
                    <p>口罩: {{selectData.mask}}</p>
                </div>
                <div>
                    <p>毛巾: {{selectData.towel}}</p>
                </div>
                <div>
                    <p>洗衣粉: {{selectData.washing}}</p>
                </div>
                <div>
                    <p>普通照明手电: {{selectData.flashligh}}</p>
                </div>
                <div>
                    <p>短筒雨靴: {{selectData.boots}}</p>
                </div>
                <div>
                    <p>领用人: {{selectData.receivePeople}}</p>
                </div>
                <div>
                    <p>发放人: {{selectData.grantPeople}}</p>
                </div>
                <div>
                    <p>部门: {{selectData.deptid}}</p>
                </div>
                <div>
                    <p>工种: {{selectData.workType}}</p>
                </div>
                <div>
                    <p>标准规定期限: {{selectData.stipulatedate}}</p>
                </div>
                <div>
                    <p>初次领用日期: {{selectData.receivedate}}</p>
                </div>
            </div>
            <div v-if="$route.query.type=='2'" class="main">
                <div>
                    <p>人员: {{selectData.personnel}}</p>
                </div>
                <div>
                    <p>布工作服: {{selectData.bgzf}}</p>
                </div>
                <div>
                    <p>管理服: {{selectData.glf}}</p>
                </div>
                <div>
                    <p>全棉衬衣: {{selectData.qmcy}}</p>
                </div>
                <div>
                    <p>皮工作鞋(靴): {{selectData.pgzx}}</p>
                </div>
                <div>
                    <p>绝缘皮鞋: {{selectData.jypx}}</p>
                </div>
                <div>
                    <p>布胶鞋: {{selectData.bjx}}</p>
                </div>
                <div>
                    <p>棉上衣: {{selectData.msy}}</p>
                </div>
                <div>
                    <p>长雨衣: {{selectData.cyy}}</p>
                </div>
                <div>
                    <p>上下身雨衣: {{selectData.sxsyy}}</p>
                </div>
                <div>
                    <p>中筒胶鞋: {{selectData.ztjx}}</p>
                </div>
                <div>
                    <p>胶鞋: {{selectData.jx}}</p>
                </div>
                <div>
                    <p>布手套: {{selectData.bst}}</p>
                </div>
                <div>
                    <p>纱手套: {{selectData.sst}}</p>
                </div>
                <div>
                    <p>护目镜: {{selectData.hmj}}</p>
                </div>
                <div>
                    <p>安全帽: {{selectData.aqm}}</p>
                </div>
                <div>
                    <p>口罩: {{selectData.kouz}}</p>
                </div>
                <div>
                    <p>肥皂: {{selectData.feiz}}</p>
                </div>
                <div>
                    <p>毛巾: {{selectData.maoj}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "articlDetail",
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