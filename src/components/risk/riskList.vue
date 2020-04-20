<template>
    <div>
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
                    <h4>{{index+1+'.'+item.name}}</h4>
                    <p style="min-width:40px">
                        <van-tag round type="primary">{{item.fxtypeText}}</van-tag>
                    </p>
                </div>
                <div class="main">
                    <div>
                        <span>1.{{item.wname}}</span>
                        <span>
                            <mt-badge
                                :type="item.grade == 1?'error':item.grade==2?'warning':'primary'"
                                :color="item.grade == 3?'yellow':''"
                                size="normal"
                            >{{item.grade+"级"}}</mt-badge>
                        </span>
                    </div>
                    <div v-for="(n,m) in item.child" :key="m">
                        <span>{{m+2+"."+n.wname}}</span>
                        <span>
                            <mt-badge
                                :type="n.grade == 1?'error':n.grade==2?'warning':'primary'"
                                :color="item.grade == 3?'yellow':''"
                                size="normal"
                            >{{n.grade+"级"}}</mt-badge>
                        </span>
                    </div>
                </div>
            </div>
            <div v-show="noData" class="noMoreText">暂无数据</div>
            <van-divider v-show="noMore">没有更多数据了</van-divider>
        </mt-loadmore>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Loadmore } from "mint-ui";
export default {
    name: "riskList",
    data() {
        return {
            page: 1,
            // 渲染的数据
            rendering: [],
            // 停止上拉加
            allLoaded: false,
            // 没有数据
            noData: false,
            // 没有更多数据了
            noMore: false
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        this.getData();
    },
    methods: {
        // 设置返还参数
        setRes(res) {
            let self = this;
            let returnArr = [];
            // 先对数组进行排序
            let sortArr = res.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
            // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
            sortArr.forEach((item, index, arr) => {
                self.$common.code2Text(
                    item,
                    "fxtype",
                    self.fxtypeSlots[0].values
                );
                if (index == 0) {
                    item.child = [];
                    returnArr.push(item);
                } else if (
                    item.name == arr[index - 1].name &&
                    item.fxtype == arr[index - 1].fxtype
                ) {
                    returnArr[returnArr.length - 1].child.push(item);
                } else {
                    item.child = [];
                    returnArr.push(item);
                }
            });
            return returnArr;
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.risk
                .getRiskList({
                    rows: 10,
                    page: this.page,
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    if (!res.rows) {
                        return;
                    }
                    // 判断rows是否返回数据
                    if (res.rows.length != 0) {
                        let data = this.setRes(res.rows);
                        // 判断是新增还是替换  默认为新增
                        if (more) {
                            this.rendering.push(...data);
                        } else {
                            this.rendering = data;
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
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/risk/auditDetail"
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
            this.noData = false;
            this.rendering = [];
            this.getData(false);
        }
    },
    computed: {
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        "mt-loadmore": Loadmore
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>