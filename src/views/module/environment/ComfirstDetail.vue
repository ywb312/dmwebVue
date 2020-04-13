<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="创先评优详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper wrap">
            <div class="main">
                <div>
                    <p>奖项名称: {{selectData.awardname}}</p>
                </div>
                <div>
                    <p>获奖单位: {{selectData.awardept}}</p>
                </div>
                <div>
                    <p>获奖级别: {{selectData.awardlevel}}</p>
                </div>
                <div>
                    <p>评价机构: {{selectData.evaagency}}</p>
                </div>
                <div>
                    <p>评奖时间: {{selectData.awardtime}}</p>
                </div>
                <div>
                    <p>有效期: {{selectData.valperiod}}</p>
                </div>
                <div>
                    <p>证书: {{selectData.certificate}}</p>
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
    name: "ComfirstDetail",
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