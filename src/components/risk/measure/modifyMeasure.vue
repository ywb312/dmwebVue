<template>
    <div class="modifyMeasure">
        <div class="maskWrap" v-show="modShow" @click="modVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">修改管控措施</div>
                <mt-field label="管控措施名称" placeholder="请输入风险名称" v-model="getData.gname"></mt-field>
                <picker title="管控措施类型" :slots="gTypeSlots" @returnMsg="getType"></picker>
                <mt-button type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
import { Toast } from "mint-ui";
export default {
    name: "modifyMeasure",
    data() {
        return {
            modVisible: false,
            getData: {
                gname: "",
                gtype: ""
            }
        };
    },
    props: ["modShow", "selcetData"],
    methods: {
        returnData(option) {
            let obj = {
                "bean.wid": this.selcetData.wid,
                "bean.gid": this.selcetData.gid,
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
            this.$api.risk.measureModify(this.returnData()).then(res => {
                this.modVisible = false;
                this.$emit("suc");
            });
        },
        getType(v) {
            this.getData.gtype = v.id;
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        modShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.modVisible = val; //将父组件的值赋给popupVisible 子组件的值
                this.getData.gname = this.selcetData.gname;
            }
        },
        modVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    computed: {
        gTypeSlots() {
            return this.$store.state.gTypeSlots;
        }
    },
    components: {
        picker
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>