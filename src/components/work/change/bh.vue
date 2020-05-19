<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="督办"
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
                        <van-radio name="true">同意</van-radio>
                        <van-radio name="false">驳回</van-radio>
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
            <date-pick title="销案日期" time="after" placeholder="请选择督办截止时间" @returnDate="getZgwcrq"></date-pick>
            <van-field
                label="完成情况"
                v-model="hcqk"
                name="完成情况"
                placeholder="完成情况"
                :rules="[{ required: true, message: '请填写完成情况' }]"
            />
            <van-field label="备注" placeholder="请输入备注" v-model="memo" />
            <van-button class="btn" type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>
<script>
import datePick from "@/components/pub/datePick";
export default {
    data() {
        return {
            isPass: "true",
            opinion: "",
            zgwcrq: "",
            hcqk: "",
            memo: "",
            upImgArr: []
        };
    },
    props: ["postData"],
    methods: {
        getZgwcrq(v) {
            this.zgwcrq = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            _self.postData["variable.keys"] = "nodepass,comments";
            _self.postData["variable.values"] = "true," + this.opinion;
            _self.postData["variable.types"] = "B,S";
            _self.postData["comments"] = this.opinion;
            _self.postData["zdbhEntity.zgwcrq"] = this.zgwcrq;
            _self.postData["zddbEntity.hcqk"] = this.hcqk;
            _self.postData["zddbEntity.memo"] = this.memo;
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
        datePick
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>