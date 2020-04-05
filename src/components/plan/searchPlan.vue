<template>
    <div class="searchPlan">
        <div class="searchGroup">
            <div class="btnGroup">
                <span :class="params.checktype=='班'?'active':''" @click="inquire('班')">班</span>
                <span :class="params.checktype=='周'?'active':''" @click="inquire('周')">周</span>
                <span :class="params.checktype=='月'?'active':''" @click="inquire('月')">月</span>
                <span :class="params.checktype=='季'?'active':''" @click="inquire('季')">季</span>
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
                <mt-button type="primary" size="small" @click.stop="clearCheacked">清空</mt-button>
                <mt-button type="primary" size="small" @click.stop="searchClick">查询</mt-button>
            </div>
        </div>
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
        >
            <div
                class="wrapper"
                v-for="(item,index) in rendering"
                :key="index"
                @click="btnClick(item)"
            >
                <div class="title">
                    <h4>{{index+1+"."+item.cpname}}</h4>
                    <p style=" min-width:85px;">
                        <mt-badge size="small">{{item.checktype}}</mt-badge>
                        <mt-badge size="small">{{item.planstatus}}</mt-badge>
                    </p>
                </div>
                <div class="main">
                    <div v-if="item.tbr">
                        <span>检查人: {{item.tbr}} | 作业地点: {{item.zydd}}</span>
                    </div>
                    <div v-if="item.checkend">
                        <span>计划执行时间: {{item.checkend}}</span>
                    </div>
                    <div>
                        <span>检查截止时间: {{item.checkdeadline}}</span>
                        <span>{{item.planfrom}}</span>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <div v-show="noDate" class="noMoreText">暂无数据</div>
        <div v-show="noMore" class="noMoreText">没有更多数据了</div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Loadmore } from "mint-ui";
import tree from "@/components/pub/tree";
import datePick from "@/components/pub/datePick";
export default {
    name: "searchPlan",
    data() {
        return {
            page: 1,
            // 渲染的数据
            rendering: [],
            // 停止上拉加
            allLoaded: false,
            // 没有数据
            noDate: false,
            // 没有更多数据了
            noMore: false,
            // 显示的数据
            params: {
                param: "",
                zydd: "",
                checkdept: "",
                tbr: "",
                deptcode: "",
                checktype: "班"
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        this.getData();
    },
    methods: {
        // 根据当前页面的配置 对请求入参进行添加筛选
        returnData() {
            let obj = {
                rows: 10,
                page: this.page,
                session: window.localStorage["session_Id"]
            };
            for (const key in this.params) {
                if (this.params[key] != "") {
                    obj["bean." + key] = this.params[key];
                }
            }
            return obj;
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.pub
                .showPage(this.pageData.ajaxurl, this.returnData())
                .then(res => {
                    if (!res.rows) {
                        return;
                    }
                    // 判断rows是否返回数据
                    if (res.rows.length != 0) {
                        // 判断是新增还是替换  默认为新增
                        if (more) {
                            this.rendering.push(...res.rows);
                        } else {
                            this.rendering = res.rows;
                        }
                        // 返回数据小于10条 停止上拉刷新
                        if (res.rows.length < 10) {
                            this.allLoaded = true;
                            this.noMore = true;
                        } else {
                            this.allLoaded = false;
                            this.noMore = false;
                        }
                    } else {
                        this.noDate = true;
                        this.allLoaded = true;
                    }
                });
        },
        // 头部查询功能
        inquire(str) {
            this.params.checktype = str;
            this.cleraData();
        },
        // 获取组织机构
        getCompany(v) {
            this.params.checkdept = v.id;
        },
        // 获取日期时间
        getDate(v) {
            this.params.param = v;
        },
        // 清空按钮事件 重置date和tree
        clearCheacked() {
            this.params.checkdept = "";
            this.params.param = "";
            this.$refs.treeChild.reset();
            this.$refs.dateChild.reset();
            this.cleraData();
        },
        // 查询按钮点击事件
        searchClick() {
            if (this.params.checkdept == "" && this.params.param == "") {
                return;
            } else {
                this.cleraData();
            }
        },
        // 点击某一项 将数据commit到vuex 跳转页面
        btnClick(obj) {
            if (!obj.tbr) return;
            this.$store.commit("getSelcetData", obj);
            this.$router.push({
                path: "/plan/planDetail"
            });
        },
        // 上拉加载方法
        loadBottom() {
            this.page++;
            this.$refs.loadmore.onBottomLoaded();
            this.getData();
        },
        // 下拉刷新方法
        loadTop() {
            this.cleraData();
            this.$refs.loadmore.onTopLoaded();
        },
        // 清空所需渲染数据并重新渲染
        cleraData() {
            this.page = 1;
            this.noMore = false;
            this.noDate = false;
            this.rendering = [];
            this.getData(false);
        }
    },
    components: {
        "mt-loadmore": Loadmore,
        tree,
        datePick
    }
};
</script>
<style scoped>
.searchPlan {
    height: 100%;
}
.searchGroup {
    position: sticky;
    top: 1.1rem;
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
    padding: 10px 0;
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