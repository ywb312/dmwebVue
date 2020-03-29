<template>
    <div class="change">
        <!-- 标题  -->
        <mt-header title="发现隐患">
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <mt-field label="填表人" placeholder="请输入填表人" v-model="tbr"></mt-field>
        <mt-field label="审批意见" placeholder="请输入审批意见" v-model="opinion"></mt-field>
        <mt-field label="整改情况" placeholder="请输入整改情况" v-model="condition"></mt-field>
        <mt-field label="验收说明" placeholder="请输入验收说明" v-model="explain"></mt-field>
        <mt-field label="备注" placeholder="请输入备注" v-model="memo"></mt-field>
        <!-- <uploadimg @toImgArr = "getImgArr"></uploadimg> -->
        <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import pick from "@/components/pub/picker";
import uploadimg from "@/components/pub/uploadimg";
export default {
    name: "change",
    data() {
        return {
            tbr: "",
            opinion: "",
            condition: "",
            explain: "",
            memo: "",
        };
    },
    methods: {
        // 获取图片数组
        // getImgArr(v){
        //     this.upImgArr = v;
        // },
        update() {
            let _self = this;
            let obj = {
                "bean.tbr": this.tbr,
                "bean.prtype": this.prtype,
                "bean.inspacetcontent": this.inspacetcontent,
                "bean.craddr": this.craddr,
                "bean.czwt": this.czwt,
                "bean.knfs": this.knfs,
                "bean.crLevel": this.crLevel,
                "bean.classify": this.classify,
                // "bean.img":this.upImgArr
                session: window.localStorage["session_Id"]
            };
            // 上传接口
            this.$api.danger.completenodyTask(obj).then(function() {
                // let instance = Toast({
                //     message: "操作成功"
                // });
                // setTimeout(() => {
                //     instance.close();
                //     _self.$router.back(-1);
                // }, 1000);
            });
        }
    },
    components: {
        pick,
        uploadimg,
        Toast
    }
};
</script>
<style scoped>
.btn {
    background-color: #2585cf;
    position: fixed;
    bottom: 0.1rem;
}
</style>