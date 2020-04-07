<template>
    <div class="addRisk">
        <div class="maskWrap" v-show="addshow" @click="addVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增风险点</div>
                <picker title="风险类型" :slots="fxtypeSlots" @returnMsg="getType"></picker>
                <mt-field label="风险名称" placeholder="请输入风险名称" v-model="getData.name"></mt-field>
                <mt-button type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
import { Toast } from "mint-ui";
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
                Toast({
                    message: "请输入风险名称",
                    position: "bottom",
                    duration: 2000
                });
                return;
            }
            if (this.getData.fxtype == "") {
                Toast({
                    message: "请选择风险类型",
                    position: "bottom",
                    duration: 2000
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