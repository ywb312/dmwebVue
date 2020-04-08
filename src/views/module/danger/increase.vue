<template>
    <div class="increase">
        <!-- 标题  -->
        <mt-header title="发现隐患" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrap">
            <mt-field label="填表人" placeholder="请输入填表人" v-model="tbr"></mt-field>
            <mt-radio title="隐患类型" v-model="prtype" :options="prtypeOption"></mt-radio>
            <pick title="可能发生的事故" :slots="knfsSlots" @returnMsg="getKnfs"></pick>
            <pick title="隐患等级" :slots="crLevelSlots" @returnMsg="getCrLevel"></pick>
            <pick
                v-if="prtype=='YHLX001'"
                title="隐患分类"
                :slots="classifySlots"
                @returnMsg="getClassify"
            ></pick>
            <mt-field label="隐患名称" placeholder="请输入隐患名称" v-model="inspacetcontent"></mt-field>
            <mt-field label="隐患地点" placeholder="请输入隐患地点" v-model="craddr"></mt-field>
            <mt-field label="存在问题" placeholder="请输入存在问题" v-model="czwt"></mt-field>
            <uploadimg @toImgArr="getImgArr"></uploadimg>
            <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import pick from "@/components/pub/picker";
import uploadimg from "@/components/pub/uploadimg";
export default {
    name: "increase",
    data() {
        return {
            tbr: "",
            prtype: "YHLX001",
            inspacetcontent: "",
            craddr: "",
            czwt: "",
            knfs: "",
            crLevel: "",
            classify: "",
            // 单选框的配置
            prtypeOption: [
                {
                    label: "一般隐患",
                    value: "YHLX001"
                },
                {
                    label: "重大隐患",
                    value: "YHLX002"
                }
            ],
            // 下拉框的配置
            crLevelSlots: [
                {
                    values: [
                        { text: "一级", id: "ZDYHJB001" },
                        { text: "二级", id: "ZDYHJB002" },
                        { text: "三级", id: "ZDYHJB003" },
                        { text: "四级", id: "ZDYHJB004" }
                    ]
                }
            ],
            classifySlots: [
                {
                    values: [
                        { text: "管理缺陷", id: "YHLB001" },
                        { text: "设备设施不安全", id: "YHLB002" },
                        { text: "员工行为不安全", id: "YHLB003" },
                        { text: "作业环境不安全", id: "YHLB004" },
                        { text: "防护用品/器不安全", id: "YHLB005" }
                    ]
                }
            ],
            upImgArr: []
        };
    },
    methods: {
        // 获取不同下拉框的值
        getKnfs(v) {
            this.knfs = v.id;
        },
        getCrLevel(v) {
            this.crLevel = v.id;
        },
        getClassify(v) {
            this.classify = v.text;
        },
        // 获取图片数组
        getImgArr(v) {
            console.log(v);
            this.upImgArr = v;
        },
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
                "bean.img": JSON.stringify(this.upImgArr),
                session: window.localStorage["session_Id"]
            };
            // 上传接口
            this.$api.danger.doAddSaveSingle(obj).then(function() {
                let instance = Toast({
                    message: "操作成功"
                });
                setTimeout(() => {
                    instance.close();
                    _self.$router.back(-1);
                }, 1000);
            });
        }
    },
    computed: {
        knfsSlots() {
            return this.$store.state.knfsSlots;
        }
    },
    components: {
        pick,
        uploadimg,
        Toast
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>