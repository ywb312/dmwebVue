<template>
    <div>
        <choice-dept @choiceCompany="getDeptCompany"></choice-dept>
        <!-- 查询 -->
        <van-sticky :offset-top="$common.getOffset()">
            <van-button plain color="#2585cf" @click="searchShow=true" block>查询</van-button>
        </van-sticky>
        <!-- <van-row type="flex" justify="space-around">
            <van-button plain hairline color="#2585cf" @click="">一键取消逾期</van-button>
        </van-row>-->
        <!-- 页面 -->
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">计划名称:</span>
                                <span class="main_val">{{item.cpname}}</span>
                            </p>
                            <p class="main_tag">
                                <van-tag size="large" round type="primary">{{item.planstatus}}</van-tag>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建日期:</span>
                                <span class="main_val">{{item.createdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">截止日期:</span>
                                <span class="main_val">{{item.checkdeadline}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检查单位:</span>
                                <span class="main_val">{{item.deptname}}</span>
                            </p>
                            <p class="main_tag">
                                <van-tag round plain size="large" type="primary">{{item.planfrom}}</van-tag>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 功能组件 -->
        <div>
            <van-dialog
                v-model="searchShow"
                title="查询条件"
                show-cancel-button
                :overlay-style="{'z-index':'999'}"
                confirmButtonText="查询"
                cancelButtonText="取消"
                @confirm="searchBack"
                @cancel="removeVal"
            >
                <div slot="default">
                    <date-pick
                        title="开始日期"
                        ref="dateChild"
                        time="before"
                        placeholder="请选择时间"
                        @returnDate="getDate"
                    ></date-pick>
                    <!-- <tree title="部门" ref="tree" @selectMsg="getCompany"></tree> -->
                </div>
            </van-dialog>
        </div>
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import ViewBox from "@/components/pub/ViewBox.vue";
import tree from "@/components/pub/tree";
import datePick from "@/components/pub/datePick";
export default {
    name: "CheckPlanNotice",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sc/checkplan/list_child_notice.action",
                obj: {
                    "bean.planstatus": "待执行",
                    "bean.createdate": ""
                }
            },
            // 查询弹窗
            searchShow: false,
            // 日期选择器
            dateShow: false,
            currentDate: new Date(),
            maxDate: new Date()
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 查询操作
        searchBack() {
            this.rendering = [];
            this.$refs.view.clearData();
        },
        // 选取矿业公司
        getDeptCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        },
        // 取消操作
        removeVal() {
            // this.$refs.tree.reset();
            this.$refs.dateChild.reset();
            this.$set(this.postData.obj, "bean.checkdept", "");
            this.$set(this.postData.obj, "bean.createdate", "");
            this.searchShow = false;
        },
        // 组织机构树返回
        getCompany(v) {
            this.postData.obj["bean.checkdept"] = v.id;
        },
        //获取日期
        getDate(val) {
            this.postData.obj["bean.createdate"] = val;
        }
        // biz/sc/checkplan/yjqxtx.action 一键取消逾期
        // bean.qxr bean.qxyy bean.qxksrq bean.qxjzrq
    },
    components: {
        ViewBox,
        tree,
        datePick,
        choiceDept
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>