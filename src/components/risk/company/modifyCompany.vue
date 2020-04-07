<template>
    <div class="modifyCompany">
        <div class="maskWrap" v-show="modShow" @click="modVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">修改危险源</div>
                <mt-field label="危险源名称" placeholder="请输入危险源名称" v-model="getData.wname"></mt-field>
                <mt-field label="项目" placeholder="请输入项目" v-model="getData.project"></mt-field>
                <mt-field label="内容" placeholder="请输入内容" v-model="getData.content"></mt-field>
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
import { Toast } from "mint-ui";
export default {
    name: "modifyCompany",
    data() {
        return {
            modVisible: false,
            getData: {
                wname: this.selcetData.wname,
                project: this.selcetData.project,
                content: this.selcetData.content,
                yxfw: this.selcetData.yxfw,
                knfs: this.selcetData.knfs,
                qzhg: this.selcetData.qzhg
            }
        };
    },
    props: ["modShow", "selcetData"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.fid": this.selcetData.fid,
                "bean.wid": this.selcetData.wid,
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
                    Toast({
                        message: "请把信息补充完整",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
            }
            this.$api.risk.companyRiskModify(this.returnData()).then(res => {
                this.modVisible = false;
                this.$emit("suc");
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
        modShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.modVisible = val; //将父组件的值赋给popupVisible 子组件的值
                this.getData.wname = this.selcetData.wname;
                this.getData.project = this.selcetData.project;
                this.getData.content = this.selcetData.content;
            }
        },
        modVisible(val) {
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