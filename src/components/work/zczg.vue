<template>
    <div class="zczg">
        <!-- 标题  -->
        <mt-header title="发现隐患">
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <mt-field label="填表人" placeholder="请输入填表人" v-model="tbr"></mt-field>
        <mt-field label="审批意见" placeholder="请输入审批意见" v-model="opinion"></mt-field>
        <mt-field label="整改情况" placeholder="请输入整改情况" v-model="zgpsqk"></mt-field>
        <date-pick title="整改时间" time="after" placeholder="请选择完成时间" @returnDate="getZgsqsj"></date-pick>
        <mt-field label="验收说明" placeholder="请输入验收说明" v-model="ysqk"></mt-field>
        <mt-field label="备注" placeholder="请输入备注" v-model="memo"></mt-field>
        <!-- <uploadimg @toImgArr = "getImgArr"></uploadimg> -->
        <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import datePick from "@/components/pub/datePick";
import uploadimg from "@/components/pub/uploadimg";
export default {
    name: "zczg",
    data() {
        return {
            tbr: "",
            opinion: "",
            zgpsqk: "",
            zgsqsj: "",
            ysqk: "",
            memo: "",
            upImgArr: []
        };
    },
    props: ["postData"],
    methods: {
        getZgsqsj(v) {
            this.zgsqsj = v;
        },
        // 获取图片数组
        // getImgArr(v){
        //     this.upImgArr = v;
        // },
        update() {
            let _self = this;
            _self.postData["variable.value"] = "true," + this.opinion;
            _self.postData["comments"] = this.opinion;
            _self.postData["zczgEntity.zgpsqk"] = this.zgpsqk;
            _self.postData["zczgEntity.zgsqsj"] = this.zgsqsj;
            _self.postData["zczgEntity.ysqk"] = this.ysqk;
            _self.postData["zczgEntity.tbr"] = this.tbr;
            _self.postData["zczgEntity.memo"] = this.memo;
            _self.postData["zczgEntity.img"] = this.upImgArr;
            // 上传接口
            this.$api.danger.completenodyTask(_self.postData).then(res => {
                res = eval("(" + res + ")");
                if (res.success) {
                    let instance = Toast({
                        message: res.id
                    });
                    setTimeout(() => {
                        instance.close();
                        _self.$router.back(-1);
                    }, 1000);
                } else {
                    Toast({
                        message: res.errormessage,
                        duration: 2000
                    });
                }
            });
        }
    },
    components: {
        datePick
    }
};
</script>
<style lang="scss" scoped>
.btn {
    background-color: #2585cf;
    position: fixed;
    bottom: 0.1rem;
}
</style>