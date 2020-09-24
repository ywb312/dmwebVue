<template>
    <div>
        <div class="searchPopup">
            <div
                class="maskWrap"
                v-show="searchShow"
                @touchmove.prevent
                @click="reset"
            >
                <div @click.stop class="maskMiddle">
                    <div class="maskTitle">隐患条件查询</div>
                    <double-date-pick
                        ref="date"
                        :config="dbDateConifg"
                        @returnDate1="getStartDate"
                        @returnDate2="getEndDate"
                    ></double-date-pick>
                    <van-button type="info" size="large" @click="update"
                        >确定</van-button
                    >
                </div>
            </div>
        </div>
        <van-sticky :offset-top="$common.getOffset()">
            <van-button plain color="#2585cf" @click="searchShow = true" block
                >查询</van-button
            >
        </van-sticky>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                >
                    <div class="main">
                        <div>
                            <p>伤者年龄: {{ item.age }}</p>
                        </div>
                        <div>
                            <p>
                                日期范围:
                                {{ item.startDate + "至" + item.endDate }}
                            </p>
                        </div>
                        <div>
                            <p>事故数量总和: {{ item.accitypesum }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import doubleDatePick from "@/components/pub/doubleDatePick";
export default {
    name: "Accireportnew",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/accibook/selectBySznlList.action",
                obj: {
                    "bean.param": "",
                    "bean.startDate": "",
                    "bean.endDate": "",
                },
            },
            searchShow: false,
            dbDateConifg: [
                { title: "起始日期", placeholder: "请选择开始日期" },
                { title: "截至日期", placeholder: "请选择截至日期" },
            ],
        };
    },
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 获取日期
        getStartDate(v) {
            this.postData.obj["bean.startDate"] = v;
        },
        getEndDate(v) {
            this.postData.obj["bean.endDate"] = v;
        },
        // 弹窗确定
        update() {
            this.$refs.view.clearData();
            this.reset();
        },
        // 弹窗重置
        reset() {
            Object.keys(this.postData).forEach((key) => {
                this.postData.obj[key] = "";
            });
            this.searchShow = false;
            this.$refs.date.reset();
        },
    },
    computed: {},
    components: {
        ViewBox,
        doubleDatePick,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>