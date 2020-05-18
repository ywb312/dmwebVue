<template>
    <div>
        <div class="maskWrap" v-show="appShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">危险源评价</div>
                <van-form @submit="postData" :show-error-message="false">
                    <picker title="可能性" ref="pickL" :slots="slotsL" @returnMsg="getL"></picker>
                    <picker title="严重性" ref="pickE" :slots="slotsE" @returnMsg="getE"></picker>
                    <picker title="频繁度" ref="pickC" :slots="slotsC" @returnMsg="getC"></picker>
                    <van-button type="info" size="large" native-type="submit">确定</van-button>
                </van-form>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
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
    props: ["appShow", "selectData"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.wid": this.selectData.wid,
                "bean.wname": this.selectData.wname
            };
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            this.$api.risk.approveAdd(this.returnData()).then(res => {
                // 数据有误
                if (typeof res != "object") {
                    _self.$toast("服务器连接错误")
                    return;
                }
                this.close();
                this.$toast({
                    message: "评价成功",
                    position: "bottom"
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
        },
        close() {
            this.$refs.pickL.reset();
            this.$refs.pickE.reset();
            this.$refs.pickC.reset();
            this.appVisible = false;
            this.$emit("popupClose");
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        appShow(val) {
            //popshow为父组件的值，val参数为值
            this.appVisible = val; //将父组件的值赋给popupVisible 子组件的值
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