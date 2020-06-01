<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="自查自改"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form class="btnMargin" @submit="update" :show-error-message="false">
            <van-field name="approve" label="审批:">
                <template #input>
                    <van-radio-group v-model="isPass" direction="horizontal" disabled>
                        <van-radio name="pass">同意</van-radio>
                        <van-radio name="noPass">驳回</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                label="填表人"
                v-model="tbr"
                name="填表人"
                placeholder="填表人"
                :rules="[{ required: true, message: '请填写填表人' }]"
            />
            <van-field
                label="审批意见"
                v-model="opinion"
                name="审批意见"
                placeholder="审批意见"
                :rules="[{ required: true, message: '请填写审批意见' }]"
            />
            <van-field
                label="整改情况"
                v-model="zgpsqk"
                name="整改情况"
                placeholder="整改情况"
                :rules="[{ required: true, message: '请填写整改情况' }]"
            />
            <date-pick
                title="整改时间"
                type="datetime"
                time="before"
                nowTime
                placeholder="请选择完成时间"
                @returnDate="getZgsqsj"
            ></date-pick>
            <van-field
                label="验收说明"
                v-model="ysqk"
                name="验收说明"
                placeholder="验收说明"
                :rules="[{ required: true, message: '请填写验收说明' }]"
            />
            <van-field label="备注" placeholder="请输入备注" v-model="memo" />
            <uploadimg @toImgArr="getImgArr"></uploadimg>
            <van-button class="btn" type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>
<script>
import datePick from "@/components/pub/datePick";
import uploadimg from "@/components/pub/uploadimg";
export default {
    data() {
        return {
            tbr: window.localStorage.username,
            opinion: "",
            zgpsqk: "",
            zgsqsj: "",
            ysqk: "",
            memo: "",
            upImgArr: [],
            isPass: "pass"
        };
    },
    props: ["postData"],
    methods: {
        getZgsqsj(v) {
            this.zgsqsj = v;
        },
        // 获取图片数组
        getImgArr(v) {
            this.upImgArr = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            _self.postData["variable.keys"] = "nodepass,comments";
            _self.postData["variable.types"] = "B,S";
            _self.postData["variable.values"] = "true," + this.opinion;
            _self.postData["comments"] = this.opinion;
            _self.postData["zczgEntity.zgpsqk"] = this.zgpsqk;
            _self.postData["zczgEntity.zgsqsj"] = this.zgsqsj;
            _self.postData["zczgEntity.ysqk"] = this.ysqk;
            _self.postData["zczgEntity.tbr"] = this.tbr;
            _self.postData["zczgEntity.memo"] = this.memo;
            _self.postData["zczgEntity.img"] = JSON.stringify(this.upImgArr);
            // 上传接口
            _self.$api.pub
                .showPage(_self.postData["nodeaction"], _self.postData)
                .then(res => {
                    _self.$store.commit("setIsLoading", false);
                    res = eval("(" + res + ")");
                    // 数据有误
                    if (typeof res != "object") {
                        _self.$toast("服务器连接错误");
                        return;
                    }
                    if (res.success) {
                        _self.$toast(res.id);
                        _self.$router.back(-1);
                    } else {
                        this.$toast({
                            message: res.errormessage
                        });
                    }
                });
        }
    },
    components: {
        datePick,
        uploadimg
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>