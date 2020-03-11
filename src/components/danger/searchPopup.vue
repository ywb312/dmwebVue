<template>
    <div class="searchPopup">
        <div class="popup" v-show="popupVisible" @click="popupVisible=false">
            <div class="middle">
                <div class="title">隐患条件查询</div>
                <pick title="隐患状态" :slots="statusSlots" @returnMsg="getStatus"></pick>
                <mt-field label="起始日期" placeholder="请选择开始日期" type="date" v-model="startDate"></mt-field>
                <mt-field label="截至日期" placeholder="请选择截至日期" type="date" v-model="endDate"></mt-field>
                <!-- <mt-button class="btn" type="primary" size="large" @click="update">确定</mt-button> -->
            </div>
        </div>
    </div>
</template>
<script>
import pick from "@/components/pub/picker";
export default {
    name: "searchPopup",
    data() {
        return {
            popupVisible: false,
            startDate: "",
            endDate: "",
            statusSlots: [
                {
                    values: [
                        {
                            text: "请选择",
                            index: "0"
                        },
                        {
                            text: "待评估",
                            index: "1"
                        },
                        {
                            text: "待指派",
                            index: "2"
                        },
                        {
                            text: "待整改",
                            index: "3"
                        },
                        {
                            text: "待验收",
                            index: "4"
                        },
                        {
                            text: "待督办",
                            index: "5"
                        },
                        {
                            text: "已闭环",
                            index: "6"
                        },
                        {
                            text: "待闭环",
                            index: "7"
                        },
                        {
                            text: "强制闭环",
                            index: "8"
                        },
                        {
                            text: "待处理",
                            index: "9"
                        }
                    ]
                }
            ]
        };
    },
    props: ["popshow"],
    methods: {
        getStatus() {
            console.log(1);
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        popshow(val) {
            //popshow为父组件的值，val参数为值
            this.popupVisible = val; //将父组件的值赋给popupVisible 子组件的值
        },
        popupVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    components: {
        pick
    }
};
</script>
<style scoped>
.popup {
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: black;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
}
.title {
    text-align: center;
    background-color: white;
    padding: 15px 0;
    color: #2585cf;
}
</style>
