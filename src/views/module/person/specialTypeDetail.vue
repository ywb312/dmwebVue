<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header :title="$route.query.type == '1'?'特种人员详情':'持证上岗人员详情'" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <div v-if="$route.query.type == '1'" class="main">
                <div>
                    <p>姓名: {{selectData.specialName}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.specialSex == "XB001" ?'男':'女'}}</p>
                </div>
                <div>
                    <p>学历: {{selectData.education}}</p>
                </div>
                <div>
                    <p>身份证号: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>准操项目: {{selectData.project}}</p>
                </div>
                <div>
                    <p>证件编号: {{selectData.specialIdCard}}</p>
                </div>
                <div>
                    <p>发证日期: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>复审日期: {{selectData.endDate}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
                </div>
                <div>
                    <p>所属单位: {{selectData.deptName}}</p>
                </div>
            </div>
            <div v-if="$route.query.type == '2'" class="main">
                <div>
                    <p>姓名: {{selectData.peopleName}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.peopleSex == "XB001" ?'男':'女'}}</p>
                </div>
                <div>
                    <p>文化程度: {{selectData.education}}</p>
                </div>
                <div>
                    <p>岗位: {{selectData.position}}</p>
                </div>
                <div>
                    <p>服务部门: {{selectData.industry}}</p>
                </div>
                <div>
                    <p>身份证号: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>联系方式: {{selectData.contact}}</p>
                </div>
                <div>
                    <p>初次培训时间: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>最新核证书时间: {{selectData.birthday}}</p>
                </div>
                <div>
                    <p>培训地点: {{selectData.trainplace}}</p>
                </div>
                <div>
                    <p>全考核证书发证机关: {{selectData.certificate}}</p>
                </div>
                <div>
                    <p>证件有效期: {{selectData.endDate}}</p>
                </div>
                <div>
                    <p>培训类别: {{selectData.traintype}}</p>
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
    name: "specialTypeDetail",
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