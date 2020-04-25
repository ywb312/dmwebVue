<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="待办事项"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
           
        >
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="title">
                    <h3>{{index+1+"."+item.name}}</h3>
                    <p></p>
                </div>
                <div class="main">
                    <div>
                        <span
                            v-if="item.startUserName"
                        >{{item.startUserName+"发现的"+item.crname+"进行"+item.taskKeyText+"处理"}}</span>
                        <span v-else>任务描述</span>
                        <span style="min-width:70px;text-align: center;">{{item.owner}}</span>
                    </div>
                    <div>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
                <div class="bottom" @click="btnClick(item)">操作</div>
            </div>
            <div v-show="noData" class="noMoreText">暂无数据</div>
            <van-divider v-show="noMore">没有更多数据了</van-divider>
        </mt-loadmore>
        <pop :popshow="popshow" :everyConfig="everyConfig" @popupClose="popshow=false"></pop>
    </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import pop from "@/components/pub/previewPopup";
export default {
    name: "backlog",
    data() {
        return {
            // 页码
            page: 1,
            // 渲染数据
            rendering: [],
            // 停止上拉加
            allLoaded: false,
            // 没有数据
            noData: false,
            // 没有更多数据了
            noMore: false,
            // 控制模态框的显示a
            popshow: false,
            everyConfig: [
                {
                    text: "查看详情",
                    router: "/danger/detail",
                    show: true
                },
                {
                    text: "审批记录",
                    component: "record",
                    show: true
                },
                {
                    text: "自查自改",
                    router: "/backlog/change",
                    routerQuery: { type: "zczg" },
                    show: true
                }
            ]
        };
    },
    created() {
        if (!this.backlog.rows) {
            this.getData();
        } else {
            this.rendering = this.settingRes(this.backlog.rows);
        }
    },
    methods: {
        getData(more = true) {
            this.$api.work
                .taskList({
                    page: this.page,
                    rows: 10,
                    session: window.localStorage["session_Id"],
                    sord: "asc"
                })
                .then(res => {
                    if (!res.rows) {
                        return;
                    }
                    // 判断rows是否返回数据
                    if (res.rows.length != 0) {
                        res.rows = this.settingRes(res.rows);
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
                        this.noData = true;
                        this.allLoaded = true;
                    }
                });
        },
        // 按钮点击事件popup组件显示
        btnClick(obj) {
            obj.yhid = obj.bussinesskey;
            this.$store.commit("getSelectData", obj);
            this.popshow = true;
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
            this.noData = false;
            this.rendering = [];
            this.getData(false);
        },
        // 处理res.rows的taskDefinitionKey
        settingRes(arr) {
            arr.forEach(item => {
                if (item.taskDefinitionKey == "zczg") {
                    item.taskKeyText = "自查自改";
                }
            });
            return arr;
        }
    },
    computed: {
        backlog() {
            return this.$store.state.backlog;
        }
    },
    components: {
        "mt-loadmore": Loadmore,
        pop
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>