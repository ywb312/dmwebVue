<template>
    <div class="searchPopup">
        <div class="maskWrap" v-show="searchShow" @click="searchShow=false">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">隐患条件查询</div>
                <tree v-if="companyShow" title="查询单位" @selectMsg="getCompany"></tree>
                <pick v-if="statusShow" title="隐患状态" :slots="statusSlots" @returnMsg="getStatus"></pick>
                <double-date-pick
                    :config="dbDateConifg"
                    @returnDate1="getStartDate"
                    @returnDate2="getEndDate"
                ></double-date-pick>
                <mt-button type="primary" size="large" @click="update">确定</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import pick from "@/components/pub/picker";
import tree from "@/components/pub/tree";
import doubleDatePick from "@/components/pub/doubleDatePick";
export default {
    name: "searchPopup",
    data() {
        return {
            searchShow: false,
            popupVisible: "",
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
            zgzrdw: "",
            dbDateConifg: [
                { title: "起始日期", placeholder: "请选择开始日期" },
                { title: "截至日期", placeholder: "请选择截至日期" }
            ]
        };
    },
    props: ["popshow", "statusShow", "companyShow"],
    methods: {
        // 返回隐患状态
        getStatus(v) {
            this.yhStatus = v.id;
        },
        getCompany(v) {
            this.zgzrdw = v.id;
        },
        getStartDate(v) {
            this.startDate = v;
        },
        getEndDate(v) {
            this.endDate = v;
        },
        update() {
            let obj = {
                crstate: this.yhStatus,
                str: this.startDate,
                end: this.endDate,
                zgzrdw: this.zgzrdw
            };
            let start = new Date(obj.str.replace(/\-/g, ".")).getTime();
            let end = new Date(obj.end.replace(/\-/g, ".")).getTime();
            if (start > end) {
                this.$toast("截止日期小于起始日期");
                return;
            }
            this.$emit("popupClose");
            this.$emit("returnMsg", obj);
        }
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
        tree,
        doubleDatePick
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>