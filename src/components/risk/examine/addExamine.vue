<template>
    <div class="addExamine">
        <div class="maskWrap" v-show="addshow" @click="addVisible=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">新增排查计划</div>
                <tree title="单位" @selectMsg="getDept"></tree>
                <picker title="频率" :slots="rateSlots" @returnMsg="getRate"></picker>
                <mt-button type="primary" size="large" @click="postData">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import picker from "@/components/pub/picker.vue";
import tree from "@/components/pub/tree.vue";
import { Toast } from "mint-ui";
export default {
    name: "addExamine",
    data() {
        return {
            addVisible: false,
            getData: {
                rate: "",
                deptid: ""
            },
            rateSlots: [
                {
                    values: [
                        {
                            text: "一班",
                            id: ""
                        },
                        {
                            text: "二班",
                            id: ""
                        },
                        {
                            text: "三班",
                            id: ""
                        },
                        {
                            text: "周",
                            id: ""
                        },
                        {
                            text: "月",
                            id: ""
                        },
                        {
                            text: "年",
                            id: ""
                        }
                    ]
                }
            ]
        };
    },
    props: ["addshow", "gid"],
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData(option) {
            let obj = {
                "bean.gid": this.gid,
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
            this.$api.risk.examineAdd(this.returnData()).then(res => {
                this.addVisible = false;
                this.$emit("addSuc");
            });
        },
        // 获取频率
        getRate(v) {
            this.getData.rate = v.text;
        },
        // 获取单位
        getDept(v) {
            this.getData.deptid = v.id;
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
        picker,
        tree
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>