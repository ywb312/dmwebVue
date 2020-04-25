<template>
    <div class="addRisk">
        <div class="maskWrap" v-show="addshow" @click="addVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增风险点</div>
                <picker title="风险类型" :slots="fxtypeSlots" @returnMsg="getType"></picker>
                <van-field label="风险名称" placeholder="请输入风险名称" v-model="getData.name"/>
                <van-button type="info" size="large" @click="postData">确定</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
export default {
    name: "addRisk",
    data() {
        return {
            addVisible: false,
            resData: [],
            getData: {
                name: "",
                fxtype: ""
            }
        };
    },
    props: ["addshow"],
    methods: {
        postData(obj) {
            if (this.getData.name == "") {
                this.$toast({
                    message: "请输入风险名称",
                    position: "bottom",
                });
                return;
            }
            if (this.getData.fxtype == "") {
                this.$toast({
                    message: "请选择风险类型",
                    position: "bottom",
                });
                return;
            }
            this.$api.risk
                .riskAdd({
                    "bean.fxtype": this.getData.fxtype,
                    "bean.name": this.getData.name,
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    this.addVisible = false;
                    this.$emit("addSuc");
                });
        },
        getType(v) {
            this.getData.fxtype = v.id;
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
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>