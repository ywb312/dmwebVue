<template>
    <div class="addMeasure">
        <div class="maskWrap" v-show="addshow" @click="addVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增管控措施</div>
                <mt-field label="管控措施名称" placeholder="请输入管控措施名称" v-model="getData.gname"></mt-field>
                <picker title="管控措施类型" :slots="gTypeSlots" @returnMsg="getGtype"></picker>
                <mt-button class="btn" type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
import { Toast } from "mint-ui";
export default {
    name: "addMeasure",
    data() {
        return {
            addVisible: false,
            getData: {
                gname: "",
                gtype: ""
            }
        };
    },
    props: ["addshow", "wid"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.wid": this.wid,
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
            this.$api.risk.measureAdd(this.returnData()).then(res => {
                this.addVisible = false;
                this.$emit("addSuc");
            });
        },
        // 获取管控类型
        getGtype(v) {
            this.getData.gtype = v.id;
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