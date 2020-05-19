<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="自查自改、上报、指派"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form class="btnMargin" @submit="update" :show-error-message="false">
            <van-field name="approve" label="审批">
                <template #input>
                    <van-radio-group v-model="isPass" direction="horizontal" disabled>
                        <van-radio name="pass">同意</van-radio>
                        <van-radio name="noPass">不同意</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <picker title="上报方式" ref="picker" :slots="typeArr" @returnMsg="dealType"></picker>
            <van-field
                label="审批意见"
                v-model="opinion"
                name="审批意见"
                placeholder="审批意见"
                :rules="[{ required: true, message: '请填写审批意见' }]"
            />
            <div v-if="type=='zp'">
                <tree ref="tree" title="整改责任单位" @selectMsg="getCompany"></tree>
                <van-field
                    label="整改治理要求"
                    v-model="zgzlyq"
                    name="整改治理要求"
                    placeholder="整改治理要求"
                    :rules="[{ required: true, message: '请填写整改治理要求' }]"
                />
                <date-pick title="整改截止时间" time="after" @returnDate="getZgdate"></date-pick>
                <van-field
                    label="填表人"
                    v-model="tbr"
                    name="填表人"
                    placeholder="填表人"
                    :rules="[{ required: true, message: '请填写填表人' }]"
                />
                <van-field label="备注" placeholder="请输入备注" v-model="memo" />
                <uploadimg @toImgArr="getImgArr"></uploadimg>
            </div>
            <van-button class="btn" type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>
<script>
import picker from "@/components/pub/picker";
import datePick from "@/components/pub/datePick";
import tree from "@/components/pub/tree";
import uploadimg from "@/components/pub/uploadimg";
export default {
    data() {
        return {
            isPass: "pass",
            type: "",
            opinion: "",
            zgzrdw: "",
            zgzlyq: "",
            zgdate: "",
            tbr: "",
            memo: "",
            upImgArr: [],
            typeArr: [
                {
                    text: "上报",
                    id: "sb"
                },
                {
                    text: "自查自改",
                    id: "zczg"
                },
                {
                    text: "指派",
                    id: "zp"
                }
            ]
        };
    },
    props: ["postData"],
    methods: {
        // 上报方式
        dealType(v) {
            this.type = v.id;
        },
        // 整改日期
        getZgdate(v) {
            this.zgdate = v;
        },
        // 获取组织结构
        getCompany(v) {
            this.zgzrdw = v;
        },
        // 获取图片数组
        getImgArr(v) {
            this.upImgArr = v;
        },
        update() {
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            if (this.type == "zp") {
                // 指派
                _self.postData["variable.keys"] =
                    "nodepass,comments,selectDeptId,sbfs";
                _self.postData["variable.types"] = "B,S,S,S";
                _self.postData["variable.values"] =
                    "true," + this.opinion + "," + this.zgzrdw.id + ",3";
                _self.postData["sbfs"] = "3";
                _self.postData["comments"] = this.opinion;
                _self.postData["sbzpEntity.assignFlag"] = "0";
                _self.postData["sbzpEntity.zgzrdw"] = this.zgzrdw.id;
                _self.postData["sbzpEntity.zgzrdwName"] = this.zgzrdw.name;
                _self.postData["sbzpEntity.zgzlyq"] = this.zgzlyq;
                _self.postData["sbzpEntity.zgdate"] = this.zgdate;
                _self.postData["sbzpEntity.tbr"] = this.tbr;
                _self.postData["sbzpEntity.memo"] = this.memo;
                _self.postData["sbzpEntity.img"] = JSON.stringify(
                    this.upImgArr
                );
            } else if (this.type == "zczg") {
                // 自查自改
                _self.postData["variable.keys"] =
                    "nodepass,comments,selectDeptId,sbfs";
                _self.postData["variable.types"] = "B,S,S,S";
                _self.postData["variable.values"] =
                    "true," + this.opinion + ",''" + ",2";
            } else if (this.type == "sb") {
                // 上报
                _self.postData["variable.keys"] =
                    "nodepass,comments,selectDeptId,sbfs";
                _self.postData["variable.types"] = "B,S,S,S";
                _self.postData["variable.values"] =
                    "true," + this.opinion + ",''" + ",1";
                _self.postData["sbfs"] = "1";
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
        picker,
        datePick,
        tree,
        uploadimg
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>