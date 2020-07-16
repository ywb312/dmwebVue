<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="按上报人数统计"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="popshow=true"
        >
            <template #right>
                <img src="@/assets/iconfont/search.svg" />
            </template>
        </van-nav-bar>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患上报人:</span>
                                <span class="main_val">{{item.tbr}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">日期范围:</span>
                                <span class="main_val">{{item.start + " 至 " + item.endtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患数量总和:</span>
                                <span class="main_val">{{item.h}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <detail-pop :detailShow="detailShow" :msg="selectDetail" @close="detailShow=false"></detail-pop>
        <search
            @returnMsg="paramsDate"
            :popshow="popshow"
            :dateShow="true"
            :sortShow="true"
            @popupClose="popshow=false"
        ></search>
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import ViewBox from "@/components/pub/ViewBox.vue";
import search from "@/components/statistics/search.vue";
import detailPop from "@/components/statistics/detailPop.vue";
export default {
    name: "personStatistics",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sa/personStatistics/list.action",
                obj: {}
            },
            popshow: false,
            detailShow: false,
            selectDetail: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        paramsDate(val) {
            this.postData.obj["bean.sort"] = val["sort"];
            this.postData.obj["bean.start"] = val["start"];
            this.postData.obj["bean.endtime"] = val["endtime"];
            this.$refs.view.clearData();
        },
        btnClick(item) {
            let _self = this;
            let obj = {
                "bean.start": this.postData.obj["bean.start"],
                "bean.endtime": this.postData.obj["bean.endtime"],
                "bean.flag": 0,
                "bean.tablesuffix": this.postData.obj["bean.tablesuffix"],
                "bean.tbr": item.tbr
            };
            this.$api.pub
                .showPage("biz/sa/personStatistics/showyh.action", obj)
                .then(res => {
                    _self.detailShow = true;
                    _self.selectDetail = res[0];
                });
        },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        }
    },
    components: {
        ViewBox,
        search,
        choiceDept,
        detailPop
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>