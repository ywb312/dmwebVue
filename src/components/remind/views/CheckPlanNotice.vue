<template>
    <div>
        <!-- 查询 -->
        <van-row type="flex" justify="space-around">
            <van-button plain hairline color="#2585cf" @click="popshow=true">查询</van-button>
            <!-- <van-button plain hairline color="#2585cf">一键取消逾期</van-button> -->
        </van-row>
        <!-- 页面 -->
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>
                                <span>计划名称:</span>
                                {{item.cpname}}
                            </p>
                            <p style="min-width:50px;text-align:right">
                                <van-tag round type="primary">{{item.planstatus}}</van-tag>
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>创建日期:</span>
                                {{item.createdate}}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>截止日期:</span>
                                {{item.checkdeadline}}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>检查单位:</span>
                                {{item.deptname}}
                            </p>
                            <p style="min-width:50px;text-align:right">
                                <van-tag round type="primary">{{item.planfrom}}</van-tag>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
        <!-- 功能组件 -->
        <div>
            <van-dialog
                v-model="popshow"
                title="查询条件"
                show-cancel-button
                confirmButtonText="查询"
                cancelButtonText="取消"
                @confirm="searchBack"
                @cancel="removeVal"
            >
                <div slot="default">
                    <van-cell title="开始日期" value-class="cellValue" @click="dateShow = true">
                        <span>{{postData.obj["bean.createdate"]}}</span>
                    </van-cell>
                    <tree title="部门" ref="tree" @selectMsg="getCompany"></tree>
                </div>
            </van-dialog>
            <!-- 日期选择 -->
            <van-popup v-model="dateShow" position="bottom">
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="getDate"
                    @cancel="dateShow=false"
                />
            </van-popup>
        </div>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import tree from "@/components/pub/tree";
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
            popshow: false,
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
            this.$refs.view.cleraData();
        },
        // 取消操作
        removeVal() {
            this.$refs.tree.setName();
            this.$set(this.postData.obj, "bean.checkdept", "");
            this.$set(this.postData.obj, "bean.createdate", "");
            this.popshow = false;
        },
        // 组织机构树返回
        getCompany(v) {
            this.postData.obj["bean.checkdept"] = v.id;
        },
        formatter(type, val) {
            if (type === "year") {
                return `${val}年`;
            } else if (type === "month") {
                return `${val}月`;
            } else if (type === "day") {
                return `${val}日`;
            }
            return val;
        },
        //获取日期
        getDate(val) {
            this.dateShow = false;
            this.$set(
                this.postData.obj,
                "bean.createdate",
                this.formatDate(val)
            );
        },
        formatDate(date) {
            return `${date.getFullYear()}-${date.getMonth() +
                1}-${date.getDate()}`;
        }
        // biz/sc/checkplan/yjqxtx.action 一键取消逾期
        // bean.qxr bean.qxyy bean.qxksrq bean.qxjzrq
    },
    components: {
        ViewBox,
        tree
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.main span {
    font-weight: bold;
}
</style>