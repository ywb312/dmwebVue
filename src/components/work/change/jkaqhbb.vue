<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="评估"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form class="btnMargin" @submit="update" :show-error-message="false">
            <van-field name="approve" label="审批:">
                <template #input>
                    <van-radio-group v-model="isPass" direction="horizontal">
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
            <div v-if="isPass=='pass'">
                <van-field
                    label="评估描述"
                    v-model="pgdesc"
                    name="评估描述"
                    placeholder="评估描述"
                    :rules="[{ required: true, message: '请填写评估描述' }]"
                />
                <van-field
                    label="管控措施"
                    v-model="gkcs"
                    name="管控措施"
                    placeholder="管控措施"
                    :rules="[{ required: true, message: '请填写管控措施' }]"
                />
                <date-pick title="评估时间" type="datetime" time="before" @returnDate="getPgdate"></date-pick>
                <van-field
                    label="填表人"
                    v-model="tbr"
                    name="填表人"
                    placeholder="填表人"
                    :rules="[{ required: true, message: '请填写填表人' }]"
                />
                <van-field label="备注" placeholder="请输入备注" v-model="memo" />
            </div>
            <van-button class="btn" type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>
<script>
import datePick from "@/components/pub/datePick";
export default {
    data() {
        return {
            isPass: "pass",
            opinion: "",
            pgdesc: "",
            gkcs: "",
            pgdate: "",
            tbr: "",
            memo: ""
        };
    },
    props: ["postData"],
    methods: {
        // 评估时间
        getPgdate(v) {
            this.pgdate = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            // 设置请求数据
            if (this.isPass == "pass") {
                _self.postData["variable.keys"] = "nodepass,comments";
                _self.postData["variable.types"] = "B,S";
                _self.postData["variable.values"] = "true," + this.opinion;
                _self.postData["approval"] = "true";
                _self.postData["comments"] = this.opinion;
                _self.postData["zdpgEntity.pgdesc"] = this.pgdesc;
                _self.postData["zdpgEntity.gkcs"] = this.gkcs;
                _self.postData["zdpgEntity.pgdate"] = this.pgdate;
                _self.postData["zdpgEntity.tbr"] = this.tbr;
                _self.postData["zdpgEntity.memo"] = this.memo;
            } else if (this.isPass == "noPass") {
                _self.postData["variable.keys"] = "nodepass,comments";
                _self.postData["variable.types"] = "B,S";
                _self.postData["variable.values"] = "false," + this.opinion;
                _self.postData["approval"] = "false";
                _self.postData["comments"] = this.opinion;
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
        datePick
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>