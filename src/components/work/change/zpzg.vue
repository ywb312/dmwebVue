<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="整改"
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
                label="审批意见"
                v-model="opinion"
                name="审批意见"
                placeholder="审批意见"
                :rules="[{ required: true, message: '请填写审批意见' }]"
            />
            <van-field
                label="申请验收说明"
                v-model="dyysqk"
                name="申请验收说明"
                placeholder="申请验收说明"
                :rules="[{ required: true, message: '请填写申请验收说明' }]"
            />
            <van-field
                label="整改情况说明"
                v-model="zgpsqk"
                name="整改情况说明"
                placeholder="整改情况说明"
                :rules="[{ required: true, message: '请填写整改情况说明' }]"
            />
            <van-field
                label="填表人"
                v-model="tbr"
                name="填表人"
                placeholder="填表人"
                :rules="[{ required: true, message: '请填写填表人' }]"
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
            isPass: "pass",
            opinion: "",
            dyysqk: "",
            zgpsqk: "",
            tbr: "",
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
        getImgArr(v) {
            this.upImgArr = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            _self.postData["variable.keys"] = "nodepass,comments";
            _self.postData["variable.types"] = "B,S";
            _self.postData["variable.values"] = "true," + this.opinion + ",2";
            _self.postData["comments"] = this.opinion;
            _self.postData["yhzgEntity.dyysqk"] = this.dyysqk;
            _self.postData["yhzgEntity.zgpsqk"] = this.zgpsqk;
            _self.postData["yhzgEntity.tbr"] = this.tbr;
            _self.postData["yhzgEntity.memo"] = this.memo;
            _self.postData["yhzgEntity.img"] = JSON.stringify(this.upImgArr);
            if (_self.postData["taskDefinitionKey"] == "zpzg") {
                _self.postData["yhzgEntity.prtype"] = "一般隐患";
            } else if (_self.postData["taskDefinitionKey"] == "zg") {
                _self.postData["yhzgEntity.prtype"] = "重大隐患";
            }
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
                        setTimeout(() => {
                            _self.$router.back(-1);
                        }, 2000);
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