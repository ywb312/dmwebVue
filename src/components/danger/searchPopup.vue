<template>
    <div class="searchPopup">
        <div class="maskWrap" v-show="searchShow" @touchmove.prevent @click="searchClose">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">隐患条件查询</div>
                <tree v-show="companyShow" ref="tree" title="查询单位" @selectMsg="getCompany"></tree>
                <pick
                    v-show="statusShow"
                    ref="pick"
                    title="隐患状态"
                    :slots="statusSlots"
                    @returnMsg="getStatus"
                ></pick>
                <double-date-pick
                    ref="date"
                    :config="dbDateConifg"
                    @returnDate1="getStartDate"
                    @returnDate2="getEndDate"
                ></double-date-pick>
                <van-button type="info" size="large" @click="update">确定</van-button>
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
            postData: {},
            statusSlots: [],
            dbDateConifg: [
                { title: "起始日期", placeholder: "请选择开始日期" },
                { title: "截至日期", placeholder: "请选择截至日期" }
            ]
        };
    },
    props: ["popshow", "statusShow", "companyShow"],
    created() {
        this.$common.comboList({ sourcename: "YHZT" }).then(res => {
            this.statusSlots = res;
        });
    },
    methods: {
        // 返回隐患状态
        getStatus(v) {
            this.postData.crstate = v.id;
        },
        getCompany(v) {
            this.postData.zgzrdw = v.id;
        },
        getStartDate(v) {
            this.postData.str = v;
        },
        getEndDate(v) {
            this.postData.end = v;
        },
        update() {
            this.$emit("popupClose");
            this.$emit("returnMsg", this.postData);
            this.reset();
        },
        searchClose() {
            this.searchShow = false;
            this.$emit("popupClose");
            this.reset();
        },
        reset() {
            Object.keys(this.postData).forEach(key => {
                this.postData[key] = "";
            });
            this.$refs.pick.reset();
            this.$refs.tree.reset();
            this.$refs.date.reset();
        }
    },
    watch: {
        // 确定显示的状态
        popshow(val) {
            //popshow为父组件的值，val参数为值
            this.searchShow = val; //将父组件的值赋给popupVisible 子组件的值
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