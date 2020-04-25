<template>
    <div class="modifyRisk">
        <div class="maskWrap" v-show="modShow" @click="modVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">修改风险点</div>
                <picker title="风险类型" :slots="slots" @returnMsg="getType"></picker>
                <van-field label="风险名称" placeholder="请输入风险名称" v-model="getData.name" />
                <van-button type="info" size="large" @click="postData">确定</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
export default {
    name: "modifyRisk",
    data() {
        return {
            modVisible: false,
            slots: [
                { text: "作业活动", id: "FXDLX001" },
                { text: "工艺", id: "FXDLX004" },
                { text: "设备", id: "FXDLX002" },
                { text: "设施", id: "FXDLX003" }
            ],
            getData: {
                name: "",
                fxtype: ""
            }
        };
    },
    props: ["modShow", "selectData"],
    methods: {
        postData(obj) {
            if (this.getData.name == "") {
                this.$toast({
                    message: "请输入风险名称",
                    position: "bottom"
                });
                return;
            }
            if (this.getData.fxtype == "") {
                this.$toast({
                    message: "请选择风险类型",
                    position: "bottom"
                });
                return;
            }
            this.$api.risk
                .riskModify({
                    "bean.fxtype": this.getData.fxtype,
                    "bean.name": this.getData.name,
                    "bean.fid": this.fid,
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    this.modVisible = false;
                    this.$emit("suc");
                });
        },
        getType(v) {
            this.getData.fxtype = v.id;
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        modShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.modVisible = val; //将父组件的值赋给popupVisible 子组件的值
                this.getData.name = this.selectData.name;
            }
        },
        modVisible(val) {
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