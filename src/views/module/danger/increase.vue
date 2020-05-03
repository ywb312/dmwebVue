<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="发现隐患"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form @submit="onSubmit">
            <van-field
                label="填表人"
                placeholder="填表人"
                v-model="tbr"
                :rules="[{ required: true,message: '请填写填表人' }]"
            />
            <van-field name="radio" label="隐患类型">
                <template #input>
                    <van-radio-group v-model="prtype" direction="horizontal">
                        <van-radio name="YHLX001">一般隐患</van-radio>
                        <van-radio name="YHLX002">重大隐患</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <pick title="可能发生事故" :slots="knfsSlots" @returnMsg="getKnfs"></pick>
            <pick title="隐患等级" :slots="crLevelSlots" @returnMsg="getCrLevel"></pick>
            <pick
                v-show="prtype=='YHLX001'"
                title="隐患分类"
                :slots="classifySlots"
                @returnMsg="getClassify"
            ></pick>
            <van-field
                label="隐患名称"
                placeholder="隐患名称"
                v-model="inspacetcontent"
                :rules="[{ required: true,message: '请填写隐患名称' }]"
            />
            <van-field
                label="隐患地点"
                placeholder="隐患地点"
                v-model="craddr"
                :rules="[{ required: true,message: '请填写隐患地点' }]"
            />
            <van-field
                label="存在问题"
                placeholder="存在问题"
                v-model="czwt"
                :rules="[{ required: true,message: '请填写存在问题' }]"
            />
            <uploadimg @toImgArr="getImgArr"></uploadimg>
            <van-button class="btn" type="info" block native-type="submit">提交</van-button>
        </van-form>
    </div>
</template>
<script>
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
            // 下拉框的配置
            crLevelSlots: [
                { text: "一级", id: "ZDYHJB001" },
                { text: "二级", id: "ZDYHJB002" },
                { text: "三级", id: "ZDYHJB003" },
                { text: "四级", id: "ZDYHJB004" }
            ],
            classifySlots: [
                { text: "管理缺陷", id: "YHLB001" },
                { text: "设备设施不安全", id: "YHLB002" },
                { text: "员工行为不安全", id: "YHLB003" },
                { text: "作业环境不安全", id: "YHLB004" },
                { text: "防护用品/器不安全", id: "YHLB005" }
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
        onSubmit(val) {
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
                _self.$toast({ message: "操作成功", duration: 1000 });
                setTimeout(() => {
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
        uploadimg
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>