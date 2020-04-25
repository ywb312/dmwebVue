<template>
    <div class="addCompany">
        <div class="maskWrap" v-show="addshow" @click="addVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增危险源</div>
                <van-field label="危险源名称" placeholder="请输入危险源名称" v-model="getData.wname"/>
                <van-field label="项目" placeholder="请输入项目" v-model="getData.project"/>
                <van-field label="内容" placeholder="请输入内容" v-model="getData.content"/>
                <picker title="影响范围" :slots="yxfwSlots" @returnMsg="getYxfw"></picker>
                <picker title="可能导致的危害" :slots="knfsSlots" @returnMsg="getKnfs"></picker>
                <picker title="潜在后果" :slots="qzhgSlots" @returnMsg="getQzhg"></picker>
                <mt-button type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
export default {
    name: "addCompany",
    data() {
        return {
            addVisible: false,
            getData: {
                wname: "",
                project: "",
                content: "",
                yxfw: "",
                knfs: "",
                qzhg: ""
            }
        };
    },
    props: ["addshow", "fid"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.fid": this.fid,
                session: window.localStorage["session_Id"]
            };
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            for (const key in this.getData) {
                if (this.getData[key] == "") {
                    this.$toast({
                        message: "请把信息补充完整",
                        duration: 2000
                    });
                    return;
                }
            }
            this.$api.risk.companyRiskAdd(this.returnData()).then(res => {
                this.addVisible = false;
                this.$emit("addSuc");
            });
        },
        getYxfw(v) {
            this.getData.yxfw = v.id;
        },
        getKnfs(v) {
            this.getData.knfs = v.id;
        },
        getQzhg(v) {
            this.getData.qzhg = v.id;
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        addshow(val) {
            //popshow为父组件的值，val参数为值
            this.addVisible = val; //将父组件的值赋给popupVisible 子组件的值
        },
        addVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    computed: {
        knfsSlots() {
            return this.$store.state.knfsSlots;
        },
        yxfwSlots() {
            return this.$store.state.yxfwSlots;
        },
        qzhgSlots() {
            return this.$store.state.qzhgSlots;
        }
    },
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.maskMiddle {
    margin-top: 38%;
}
</style>