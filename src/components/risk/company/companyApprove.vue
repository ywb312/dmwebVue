<template>
    <div class="companyApprove">
        <div class="maskWrap" v-show="appShow" @click="appVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">危险源评价</div>
                <picker title="可能性" :slots="slotsL" @returnMsg="getL"></picker>
                <picker title="严重性" :slots="slotsE" @returnMsg="getE"></picker>
                <picker title="频繁度" :slots="slotsC" @returnMsg="getC"></picker>
                <mt-button class="btn" type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
import { Toast } from "mint-ui";
export default {
    name: "companyApprove",
    data() {
        return {
            appVisible: false,
            getData: {
                l: "",
                e: "",
                c: ""
            }
        };
    },
    props: ["appShow", "selcetData"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.wid": this.selcetData.wid,
                "bean.wname": this.selcetData.wname,
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
                        message: "请继续选择完毕后提交",
                        position: "bottom",
                        duration: 2000
                    });
                    return;
                }
            }
            this.$api.risk.approveAdd(this.returnData()).then(res => {
                this.appVisible = false;
                Toast({
                    message: "评价成功",
                    position: "bottom",
                    duration: 2000
                });
            });
        },
        getL(v) {
            this.getData.l = v.id;
        },
        getE(v) {
            this.getData.e = v.id;
        },
        getC(v) {
            this.getData.c = v.id;
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        appShow(val) {
            //popshow为父组件的值，val参数为值
            this.appVisible = val; //将父组件的值赋给popupVisible 子组件的值
        },
        appVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    computed: {
        slotsL() {
            return this.$store.state.lecSlotsL;
        },
        slotsE() {
            return this.$store.state.lecSlotsE;
        },
        slotsC() {
            return this.$store.state.lecSlotsC;
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
    /* margin-top: 38%; */
}
</style>