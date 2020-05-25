<template>
    <div>
        <div class="maskWrap" v-show="appShow" @click="close">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">危险源评价</div>
                <van-form @submit="postData" :show-error-message="false">
                    <picker title="可能性" ref="pickL" :slots="lecSlotsL" @returnMsg="getL"></picker>
                    <picker title="严重性" ref="pickE" :slots="lecSlotsE" @returnMsg="getE"></picker>
                    <picker title="频繁度" ref="pickC" :slots="lecSlotsC" @returnMsg="getC"></picker>
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
            obj["bean.pjid"] = this.selectData.pjid || "";
            for (const key in this.getData) {
                obj["bean." + key] = this.getData[key];
            }
            return obj;
        },
        postData(obj) {
            this.$store.commit("setIsLoading", true);
            this.$api.risk.approveAdd(this.returnData()).then(res => {
                this.$store.commit("setIsLoading", false);
                let data = eval("(" + res + ")");
                // 数据有误
                if (!data.success) {
                    this.$toast("提交不成功");
                    return;
                }
                this.close();
                this.$emit("suc");
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
        },
        setLEC(num) {
            let a = Number(num);
            if (a >= 1) {
                a = Math.floor(a);
            }
            return a;
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        appShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.appVisible = val; //将父组件的值赋给popupVisible 子组件的值
                this.$refs.pickL.setVal(this.setLEC(this.selectData.l));
                this.$refs.pickE.setVal(this.setLEC(this.selectData.e));
                this.$refs.pickC.setVal(this.setLEC(this.selectData.c));
            }
        }
    },
    components: {
        picker
    },
    computed: {
        lecSlotsL() {
            return this.$store.state.lecSlotsL;
        },
        lecSlotsE() {
            return this.$store.state.lecSlotsE;
        },
        lecSlotsC() {
            return this.$store.state.lecSlotsC;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>