<template>
    <div class="searchPopup">
        <div class="maskWrap" v-show="searchShow" @touchmove.prevent @click="searchClose">
            <div @click.stop class="maskMiddle">
                <div class="maskTitle">条件查询</div>
                <!-- <tree v-show="companyShow" ref="tree" title="查询单位" @selectMsg="getCompany"></tree> -->
                <double-date-pick
                    ref="date"
                    v-show="dateShow"
                    :config="dbDateConifg"
                    @returnDate1="getStartDate"
                    @returnDate2="getEndDate"
                ></double-date-pick>
                <pick
                    v-show="sortShow"
                    ref="sortPick"
                    title="排序"
                    :slots="sortArr"
                    @returnMsg="getSort"
                ></pick>
                <pick
                    v-show="typeShow"
                    ref="typePick"
                    title="类型"
                    :slots="typeArr"
                    @returnMsg="getType"
                ></pick>
                <van-button type="info" size="large" @click="update">确定</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import tree from "@/components/pub/tree";
import doubleDatePick from "@/components/pub/doubleDatePick";
import pick from "@/components/pub/picker";
export default {
    name: "searchPopup",
    data() {
        return {
            searchShow: false,
            popupVisible: "",
            postData: {},
            dbDateConifg: [
                { title: "起始日期", placeholder: "请选择开始日期" },
                { title: "截至日期", placeholder: "请选择截至日期" }
            ],
            sortArr: [
                { text: "正序", id: "desc" },
                { text: "倒叙", id: "asc" }
            ],
            typeArr: [
                {
                    text: "作业活动",
                    id: "FXDLX001"
                },
                { text: "设备", id: "FXDLX002" },
                { text: "设施", id: "FXDLX003" },
                { text: "工艺", id: "FXDLX004" }
            ]
        };
    },
    props: {
        // 搜索框的显示
        popshow: {
            type: Boolean,
            default: false
        },
        // 单位的显示
        companyShow: {
            type: Boolean,
            default: false
        },
        // 日期显示
        dateShow: {
            type: Boolean,
            default: false
        },
        // 排序
        sortShow: {
            type: Boolean,
            default: false
        },
        // 类型
        typeShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 返回隐患状态
        getCompany(v) {
            this.postData.zrdw = v.id;
        },
        getStartDate(v) {
            this.postData.start = v;
        },
        getEndDate(v) {
            this.postData.endtime = v;
        },
        getSort(v) {
            this.postData.sort = v.id;
        },
        getType(v) {
            this.postData.lx = v.id;
        },
        // 点击确定 搜索
        update() {
            this.$emit("popupClose");
            this.$emit("returnMsg", this.postData);
            this.reset();
        },
        // 关闭 不进行搜索
        searchClose() {
            this.searchShow = false;
            this.$emit("popupClose");
            this.reset();
        },
        // 重置输入框
        reset() {
            Object.keys(this.postData).forEach(key => {
                this.postData[key] = "";
            });
            // this.$refs.tree.reset();
            this.$refs.date.reset();
            this.$refs.sortPick.reset();
            this.$refs.typePick.reset();
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
        tree,
        doubleDatePick,
        pick
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>