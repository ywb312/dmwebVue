<template>
    <div class="searchPopup">
        <div class="searchWrap" v-show="searchShow" @click="searchShow=false">
            <div @click.stop class="middle">
                <div class="title">隐患条件查询</div>
                <tree title="查询单位" @selectMsg="getCompany" ></tree>
                <pick v-if="statusShow" title="隐患状态" :slots="statusSlots" @returnMsg="getStatus"></pick>
                <mt-field label="起始日期" placeholder="请选择开始日期" type="date" v-model="startDate"></mt-field>
                <mt-field label="截至日期" placeholder="请选择截至日期" type="date" v-model="endDate"></mt-field>
                <mt-button class="btn" type="primary" size="large" @click="update">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import pick from "@/components/pub/picker";
import tree from "@/components/pub/tree";
export default {
    name: "searchPopup",
    data() {
        return {
            searchShow: false,
            popupVisible:"",
            startDate: "",
            endDate: "",
            yhStatus: "",
            statusSlots: [
                {
                    values: [
                        {
                            text: "请选择",
                            id: "0"
                        },
                        {
                            text: "待评估",
                            id: "1"
                        },
                        {
                            text: "待指派",
                            id: "2"
                        },
                        {
                            text: "待整改",
                            id: "3"
                        },
                        {
                            text: "待验收",
                            id: "4"
                        },
                        {
                            text: "待督办",
                            id: "5"
                        },
                        {
                            text: "已闭环",
                            id: "6"
                        },
                        {
                            text: "待闭环",
                            id: "7"
                        },
                        {
                            text: "强制闭环",
                            id: "8"
                        },
                        {
                            text: "待处理",
                            id: "9"
                        }
                    ]
                }
            ],
            zgzrdw:""
        };
    },
    props: ["popshow", "statusShow"],
    methods: {
        // 返回隐患状态
        getStatus(v) {
            this.yhStatus = v.id;
        },
        getCompany(v){
            this.zgzrdw = v.id;
        },
        update() {
            let obj = {
                crstate: this.yhStatus,
                str: this.startDate,
                end: this.endDate,
                zgzrdw:this.zgzrdw
            };
            this.$emit("popupClose");
            this.$emit("returnMsg", obj);
        },
    },
    watch: {
        // 监听两个值 确定显示的状态
        popshow(val) {
            //popshow为父组件的值，val参数为值
            this.searchShow = val; //将父组件的值赋给popupVisible 子组件的值
        },
        searchShow(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    components: {
        pick,
        tree
    }
};
</script>
<style scoped>
.searchWrap {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
}
.middle {
    width: 100%;
    margin-top: 50%;
}
.title {
    font-size: 22px;
    text-align: center;
    background-color: white;
    padding: 15px 0;
    color: #2585cf;
}
</style>
