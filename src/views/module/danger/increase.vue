<template>
    <div class="increase">
        <!-- 标题  -->
        <mt-header title="发现隐患">
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <mt-field label="填表人" placeholder="请输入填表人" v-model="tbr"></mt-field>
        <mt-radio title="隐患类型" v-model="prtype" :options="prtypeOption"></mt-radio>
        <pick title="可能发生的事故" :slots="knfsSlots" @returnMsg="getKnfs"></pick>
        <pick title="隐患等级" :slots="crLevelSlots" @returnMsg="getCrLevel"></pick>
        <pick v-if="prtype=='YHLX001'" title="隐患分类" :slots="classifySlots" @returnMsg="getClassify"></pick>
        <mt-field label="隐患名称" placeholder="请输入隐患名称" v-model="inspacetcontent"></mt-field>
        <mt-field label="隐患地点" placeholder="请输入隐患地点" v-model="craddr"></mt-field>
        <mt-field label="存在问题" placeholder="请输入存在问题" v-model="czwt"></mt-field>
        <!-- <uploadimg @toImgArr = "getImgArr"></uploadimg> -->
        <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
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
            knfsSlots: [
                {
                    values: [
                        { text: "请选择", id: "0" },
                        { text: "物体打击", id: "1" },
                        { text: "车辆伤害", id: "2" },
                        { text: "机械伤害", id: "3" },
                        { text: "起重伤害", id: "4" },
                        { text: "触电", id: "5" },
                        { text: "淹溺", id: "6" },
                        { text: "灼烫", id: "7" },
                        { text: "火灾", id: "8" },
                        { text: "高处坠落", id: "9" },
                        { text: "坍塌", id: "10" },
                        { text: "冒顶片帮", id: "11" },
                        { text: "透水", id: "12" },
                        { text: "放炮", id: "13" },
                        { text: "火药爆炸", id: "14" },
                        { text: "瓦斯爆炸", id: "15" },
                        { text: "锅炉爆炸", id: "16" },
                        { text: "容器爆炸", id: "17" },
                        { text: "其它爆炸", id: "18" },
                        { text: "中毒和窒息", id: "19" },
                        { text: "其它伤害", id: "20" }
                    ]
                }
            ],
            crLevelSlots: [
                {
                    values: [
                        { text: "请选择", id: "0" },
                        { text: "一级", id: "1" },
                        { text: "二级", id: "2" },
                        { text: "三级", id: "3" },
                        { text: "四级", id: "4" }
                    ]
                }
            ],
            classifySlots: [
                {
                    values: [
                        { text: "请选择" },
                        { text: "行为不安全" },
                        { text: "物品不安全" },
                        { text: "环境不安全" },
                        { text: "管理缺陷" }
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