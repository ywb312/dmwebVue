<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="验收"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form class="btnMargin" @submit="update" :show-error-message="false">
            <van-field name="approve" label="审批:">
                <template #input>
                    <van-radio-group
                        v-model="isPass"
                        direction="horizontal"
                        :disabled="postData['taskDefinitionKey']=='zpys'?false:true"
                    >
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
            <date-pick title="验收时间" type="datetime" time="before" nowTime @returnDate="getXcyssj"></date-pick>
            <van-field
                label="验收情况"
                v-model="ysqk"
                name="验收情况"
                placeholder="验收情况"
                :rules="[{ required: true, message: '请填写验收情况' }]"
            />
            <van-field
                label="验收专家及人员"
                v-model="yszjry"
                name="验收专家及人员"
                placeholder="验收专家及人员"
                :rules="[{ required: true, message: '请填写验收专家及人员' }]"
            />
            <div v-if="isPass=='noPass'">
                <van-field
                    label="驳回原因"
                    v-model="cause"
                    name="驳回原因"
                    placeholder="驳回原因"
                    :rules="[{ required: true, message: '请填写驳回原因' }]"
                />
                <tree ref="tree" title="整改责任单位" @selectMsg="getCompany" :childId="deptID"></tree>
                <van-field
                    label="整改治理要求"
                    v-model="zgzlyq"
                    name="整改治理要求"
                    placeholder="整改治理要求"
                    :rules="[{ required: true, message: '请填写整改治理要求' }]"
                />
                <date-pick title="整改截止时间" type="datetime" time="after" @returnDate="getZgdate"></date-pick>
            </div>
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
import tree from "@/components/pub/tree";
import uploadimg from "@/components/pub/uploadimg";
export default {
    data() {
        return {
            deptID: window.localStorage.deptid,
            isPass: "pass",
            opinion: "",
            xcyssj: "",
            ysqk: "",
            yszjry: "",
            tbr: window.localStorage.username,
            memo: "",
            zgdate: "",
            upImgArr: [],
            cause: "",
            zgzlyq: "",
            zgzrdw: ""
        };
    },
    props: ["postData"],
    methods: {
        // 验收日期
        getXcyssj(v) {
            this.xcyssj = v;
        },
        // 整改截止日期
        getZgdate(v) {
            this.zgdate = v;
        },
        // 获取图片数组
        getImgArr(v) {
            this.upImgArr = v;
        },
        // 获取组织结构
        getCompany(v) {
            this.zgzrdw = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            // 设置请求数据
            if (this.isPass == "pass") {
                _self.postData["variable.keys"] = "nodepass,comments";
                _self.postData["variable.types"] = "B,S";
                _self.postData["variable.values"] = "true," + this.opinion;
                _self.postData["comments"] = this.opinion;
                _self.postData["zczgEntity.xcyssj"] = this.xcyssj;
                _self.postData["zczgEntity.ysqk"] = this.ysqk;
                _self.postData["zczgEntity.yszjry"] = this.yszjry;
                _self.postData["zczgEntity.tbr"] = this.tbr;
                _self.postData["zczgEntity.memo"] = this.memo;
                _self.postData["zczgEntity.img"] = JSON.stringify(
                    this.upImgArr
                );
            } else if (this.isPass == "noPass") {
                _self.postData["variable.keys"] =
                    "nodepass,comments,selectDeptId,sbfs";
                _self.postData["variable.types"] = "B,S,S,S";
                _self.postData["variable.values"] =
                    "false," + this.opinion + "," + this.zgzrdw.id + ",2";
                _self.postData["comments"] = this.opinion;
                _self.postData["zczgEntity.ysqk"] = this.ysqk;
                _self.postData["zczgEntity.boHui"] = "true";
                _self.postData["zczgEntity.xcyssj"] = this.xcyssj;
                _self.postData["zczgEntity.yszjry"] = this.yszjry;
                _self.postData["zczgEntity.ysqk"] = this.ysqk;
                _self.postData["zczgEntity.tbr"] = this.tbr;
                // zczgEntity.memo为驳回原因
                _self.postData["zczgEntity.memo"] = this.cause;
                _self.postData["zczgEntity.zgzrdw"] = this.zgzrdw.id;
                _self.postData["zczgEntity.zgzrdwName"] = this.zgzrdw.name;
                _self.postData["zczgEntity.zgzlyq"] = this.zgzlyq;
                _self.postData["zczgEntity.zgdate"] = this.zgdate;
                // zczgEntity.zgmemo为备注
                _self.postData["zczgEntity.zgmemo"] = this.memo;
                _self.postData["zczgEntity.img"] = JSON.stringify(
                    this.upImgArr
                );
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
        tree,
        uploadimg
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>