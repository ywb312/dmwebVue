<template>
    <div class="addRisk">
        <div class="maskWrap" v-show="addshow" @click="addVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增风险点</div>
                <picker title="风险类型" :slots="slots" @returnMsg="getType"></picker>
                <mt-field label="风险名称" placeholder="请输入风险名称" v-model="getData.name"></mt-field>
                <mt-button class="btn" type="primary" size="large" @click="postData">确定</mt-button>
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
            slots: [
                {
                    values: [
                        { text: "请选择", id: "" },
                        { text: "作业活动", id: "FXDLX001" },
                        { text: "工艺", id: "FXDLX004" },
                        { text: "设备", id: "FXDLX002" },
                        { text: "设施", id: "FXDLX003" }
                    ]
                }
            ],
            getData: {
                name: "",
                fxtype: ""
            }
        };
    },
    props: ["addshow"],
    methods: {
        postData(obj) {
            if (this.getData.name=="") {
                Toast({
                    message: "请输入风险名称",
                    position: "bottom",
                    duration: 2000
                });
                return
            }
            if (this.getData.fxtype=="") {
                Toast({
                    message: "请选择风险类型",
                    position: "bottom",
                    duration: 2000
                });
                return
            }
            this.$api.risk
                .riskAdd({
                    "bean.fxtype": this.getData.fxtype,
                    "bean.name": this.getData.name,
                    session: window.localStorage["session_Id"],
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
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>