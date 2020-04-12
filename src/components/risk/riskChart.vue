<template>
    <div class="riskChart">
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
                    <h4>{{index+1+'.'+item.name}}</h4>
                </div>
                <div class="main">
                    <div>
                        <p>一级危险源: {{item.onegrade+"个"}}</p>
                    </div>
                    <div>
                        <p>二级危险源: {{item.twograde+"个"}}</p>
                    </div>
                    <div>
                        <p>三级危险源: {{item.threegrade+"个"}}</p>
                    </div>
                    <div>
                        <p>四级危险源: {{item.fourgrade+"个"}}</p>
                    </div>
                    <div>
                        <p>危险源合计: {{item.allgrade+"个"}}</p>
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
    name: "riskChart",
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
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.risk
                .getRiskChart({
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
                        let data = res.rows;
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
    components: {
        "mt-loadmore": Loadmore
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>