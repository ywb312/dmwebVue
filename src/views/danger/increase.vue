<template>
    <div class="increase">
        <!-- 标题  -->
        <mt-header title="发现隐患">
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <mt-field label="填表人" placeholder="请输入填表人" v-model="tbr"></mt-field>
        <mt-radio title="隐患类型" v-model="prtype" :options="['一般隐患', '重大隐患']"></mt-radio>
        <pick title="可能发生的事故" :slots="knfsSlots" @returnMsg = "getKnfs"></pick>
        <pick title="隐患等级" :slots="crLevelSlots"  @returnMsg = "getCrLevel"></pick>
        <pick title="隐患分类" :slots="classifySlots"  @returnMsg = "getClassify"></pick>
        <mt-field label="隐患名称" placeholder="请输入隐患名称" v-model="inspacetcontent"></mt-field>
        <mt-field label="隐患地点" placeholder="请输入隐患地点" v-model="craddr"></mt-field>
        <mt-field label="存在问题" placeholder="请输入存在问题" v-model="czwt"></mt-field>
        <!-- <uploadimg @toImgArr = "getImgArr"></uploadimg> -->
        <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import pick from "@/components/pub/picker";
import uploadimg from "@/components/pub/uploadimg";
export default {
    name: "increase",
    data() {
        return {
            tbr: "",
            prtype: "一般隐患",
            inspacetcontent: "",
            introduction: "",
            craddr: "",
            czwt: "",
            knfs:"",
            crLevel:"",
            classify:"",
            // 下拉框的配置
            knfsSlots: [
                {
                    values: [
                        "请选择",
                        "物体打击",
                        "车辆伤害",
                        "机械伤害",
                        "起重伤害",
                        "触电",
                        "淹溺",
                        "灼烫",
                        "火灾",
                        "高处坠落",
                        "坍塌",
                        "冒顶片帮",
                        "透水",
                        "放炮",
                        "火药爆炸",
                        "瓦斯爆炸",
                        "锅炉爆炸",
                        "容器爆炸",
                        "其它爆炸",
                        "中毒和窒息",
                        "其它伤害"
                    ]
                }
            ],
            crLevelSlots: [
                {
                    values: ["请选择", "一级", "二级", "三级", "四级"]
                }
            ],
            classifySlots: [
                {
                    values: ["请选择", "行为不安全", "物品不安全", "环境不安全", "管理缺陷"]
                }
            ],
            upImgArr:[],
        };
    },
    methods: {
        // 获取不同下拉框的值
        getKnfs(v){
            let arr = this.knfsSlots[0].values;
            for(let i = 0;i<arr.length;i++){
                if(arr[i]==v){
                    this.knfs = "KNFS" + i;
                }
            }
        },
        getCrLevel(v){
            let a = "";
            switch(v) {
                case "一级":
                    a="1";
                    break;
                case "二级":
                    a="2";
                    break;
                case "三级":
                    a="3";
                    break;
                case "四级":
                    a="4";
                    break;
                default:
                    a="1";
                    break;
            } 
            this.crLevel = a;
        },
        getClassify(v){
            this.classify = v;
        },
        // 获取图片数组
        // getImgArr(v){
        //     this.upImgArr = v;
        // },
        update(){
            let prtype = "";
            if(this.prtype=="一般隐患"){
                prtype="YHLX001"
            }else{
                prtype="YHLX002"
            }
            let _self = this;
            let obj = {
                "bean.tbr":this.tbr,
                "bean.prtype":prtype,
                "bean.inspacetcontent":this.inspacetcontent,
                "bean.introduction":this.introduction,
                "bean.craddr":this.craddr,
                "bean.czwt":this.czwt,
                "bean.knfs":this.knfs,
                "bean.crLevel":this.crLevel,
                "bean.classify":this.classify,
                // "bean.img":this.upImgArr
                "session":window.localStorage["session_Id"]
            }
            // 上传接口
            this.$api.danger.doAddSaveSingle(obj).then(function(){
                 let instance = Toast({
                    message: '操作成功',
                });
                setTimeout(()=>{
                    instance.close();
                    _self.$router.back(-1);
                },1000);
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
<style>
.mint-radiolist {
    display: flex;
    align-items: center;
    color: black;
}
.mint-radiolist-title {
    font-size: 16px;
    color: #000;
}
</style>
<style scoped>
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
.btn{
    background-color: #2585cf;
    position: fixed;
    bottom: 0.1rem;
}
</style>