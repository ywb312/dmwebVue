<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="安全检查"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <mt-field label="作业地点" placeholder="请输入作业地点" v-model="zydd"></mt-field>
        <mt-field label="检查人员" placeholder="请输入备注说明" v-model="tbr"></mt-field>
        <mt-field label="检查日期" placeholder="请输入检查日期" v-model="date" readonly></mt-field>
        <div>
            <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
        </div>
    </div>
</template>
<script>
import tree from "@/components/pub/tree";
import datePick from "@/components/pub/datePick";
export default {
    name: "safeCheack",
    data() {
        return {
            zydd: "",
            tbr: "",
            date: ""
        };
    },
    created() {
        let date = new Date();
        let years = new Date().getFullYear();
        let mon = new Date().getMonth() + 1;
        let day = new Date().getDay();
        this.date = years + "-" + mon + "-" + day + " ";
    },
    methods: {
        update() {
            // if (this.zgzrdw == "") {
            //     this.$toast({
            //         message: "请选择整改责任单位",
            //         duration: 2000
            //     });
            //     return;
            // } else if (this.zgzlyq == "") {
            //     this.$toast({
            //         message: "请输入整改治理要求",
            //         duration: 2000
            //     });
            //     return;
            // } else if (this.tbr == "") {
            //     this.$toast({
            //         message: "请输入填表人员名称",
            //         duration: 2000
            //     });
            //     return;
            // } else if (this.zgdate == "") {
            //     this.$toast({
            //         message: "请选择整改截止时间",
            //         duration: 2000
            //     });
            //     return;
            // }
            // let _self = this;
            // let obj = {
            //     "sbzpEntity.yhid": this.selectData.yhid,
            //     session: window.localStorage["session_Id"]
            // };
            // // 上传接口
            // this.$api.danger.doexp(obj).then(function() {
            //     let instance = this.$toast({
            //         message: "操作成功"
            //     });
            //     setTimeout(() => {
            //         instance.close();
            //         _self.$router.back(-1);
            //     }, 1000);
            // });
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {}
};
</script>
<style scoped src="@/assets/css/public.css"/>