<template>
    <div class="page">
        <div class="searchGroup">
            <div class="btnGroup">
                <span
                    :class="postData.obj['bean.checktype']=='班'?'active':''"
                    @click="inquire('班')"
                >班</span>
                <span
                    :class="postData.obj['bean.checktype']=='周'?'active':''"
                    @click="inquire('周')"
                >周</span>
                <span
                    :class="postData.obj['bean.checktype']=='月'?'active':''"
                    @click="inquire('月')"
                >月</span>
                <span
                    :class="postData.obj['bean.checktype']=='季'?'active':''"
                    @click="inquire('季')"
                >季</span>
            </div>
            <tree title="查询单位" ref="treeChild" placeholder="请选择单位" @selectMsg="getCompany"></tree>
            <date-pick
                title="查询日期"
                ref="dateChild"
                time="before"
                placeholder="请选择时间"
                @returnDate="getDate"
            ></date-pick>
            <div class="searchBtn">
                <van-button type="info" size="small" @click.stop="clearCheacked">清空</van-button>
                <van-button type="info" size="small" @click.stop="searchClick">查询</van-button>
            </div>
        </div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.cpname}}</h4>
                        <p class="main_tag">
                            <van-tag size="large" round type="primary">{{item.planstatus}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div v-if="item.tbr">
                            <span>检查人: {{item.tbr}} | 作业地点: {{item.zydd}}</span>
                        </div>
                        <div v-if="item.checkend">
                            <p class="main_text">
                                <span class="main_title">计划执行时间:</span>
                                <span class="main_val">{{item.checkend}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">计划来源:</span>
                                <span class="main_val">{{item.planfrom}}</span>
                            </p>
                             <p class="main_tag">
                                <van-tag size="large" round type="primary">{{item.checktype}}</van-tag>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检查截止时间:</span>
                                <span class="main_val">{{item.checkdeadline}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
import tree from "@/components/pub/tree";
import datePick from "@/components/pub/datePick";
export default {
    name: "searchPlan",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sc/checkplan/getChildPlanRecord.action",
                obj: {
                    "bean.checktype": "班",
                    "bean.checkdept": "",
                    "bean.param": ""
                }
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 头部查询功能
        inquire(str) {
            this.postData.obj["bean.checktype"] = str;
            this.$refs.view.cleraData();
        },
        // 获取组织机构
        getCompany(v) {
            this.postData.obj["bean.checkdept"] = v.id;
        },
        // 获取日期时间
        getDate(v) {
            this.postData.obj["bean.param"] = v;
        },
        // 清空按钮事件 重置date和tree
        clearCheacked() {
            this.postData.obj["bean.checkdept"] = "";
            this.postData.obj["bean.param"] = "";
            this.$refs.treeChild.reset();
            this.$refs.dateChild.reset();
            this.$refs.view.cleraData();
        },
        // 查询按钮点击事件
        searchClick() {
            if (
                this.postData.obj["bean.checkdept"] == "" &&
                this.postData.obj["bean.param"] == ""
            ) {
                return;
            } else {
                this.$refs.view.cleraData();
            }
        },
        // 点击某一项 将数据commit到vuex 跳转页面
        btnClick(obj) {
            if (!obj.tbr) return;
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/plan/planDetail"
            });
        }
    },
    components: {
        tree,
        datePick,
        ViewBox
    }
};
</script>
<style scoped>
.searchGroup {
    position: sticky;
    top: 46px;
    font-size: 14px;
    z-index: 100;
}
.btnGroup {
    padding-top: 8px;
    display: flex;
    justify-content: space-around;
    background-color: white;
}
.btnGroup span {
    width: 20%;
    padding: 8px 0;
    text-align: center;
    border: solid 1px #2585cf;
    border-radius: 10px;
}
.searchBtn {
    display: flex;
    justify-content: space-around;
    background: white;
    text-align: center;
    padding-bottom: 8px;
}
.active {
    color: white;
    background-color: #2585cf;
}
</style>
<style scoped src="@/assets/css/public.css"/>