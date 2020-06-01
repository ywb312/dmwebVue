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
            <date-pick
                title="督办截止时间"
                type="datetime"
                time="after"
                placeholder="请选择督办截止时间"
                @returnDate="getDate"
            ></date-pick>
            <tree ref="tree" title="督办责任单位" @selectMsg="getCompany"></tree>
            <van-field
                label="督办事项"
                v-model="column_12"
                name="督办事项"
                placeholder="督办事项"
                :rules="[{ required: true, message: '请填写督办事项' }]"
            />
            <van-field
                label="填表人"
                v-model="tbr"
                name="填表人"
                placeholder="填表人"
                :rules="[{ required: true, message: '请填写填表人' }]"
            />
            <van-field label="备注" placeholder="请输入备注" v-model="memo" />
            <van-button class="btn" type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>
<script>
import datePick from "@/components/pub/datePick";
import tree from "@/components/pub/tree";
export default {
    data() {
        return {
            isPass: "true",
            opinion: "",
            dbjzdate: "",
            zgbm: "",
            column_12: "",
            tbr: window.localStorage.username,
            memo: "",
            upImgArr: []
        };
    },
    props: ["postData"],
    methods: {
        getDate(v) {
            this.dbjzdate = v;
        },
        getCompany(v) {
            this.zgbm = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            _self.postData["variable.keys"] =
                "nodepass,comments,selectDeptId,sbfs";
            _self.postData["variable.values"] =
                "true," + this.opinion + "," + this.zgbm.id + ",2";
            _self.postData["variable.types"] = "B,S,S,S";
            _self.postData["comments"] = this.opinion;
            _self.postData["zddbEntity.dbjzdate"] = this.dbjzdate;
            _self.postData["zddbEntity.zgbm"] = this.zgbm.id;
            _self.postData["sbzpEntity.zgbm"] = this.zgbm.name;
            _self.postData["zddbEntity.column_12"] = this.column_12;
            _self.postData["zddbEntity.tbr"] = this.tbr;
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
        tree
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>