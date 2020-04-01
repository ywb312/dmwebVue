<template>
    <div class="myPlan">
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
                    <p style="min-width:40px">
                        <mt-badge size="small">{{item.checktype}}</mt-badge>
                    </p>
                </div>
                <div class="main">
                    <div>
                        <span>检查截止时间: {{item.checkdeadline}}</span>
                        <mt-badge size="small">{{item.planstatus}}</mt-badge>
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
export default {
    name: "myPlan",
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
            // 控制模态框的显示
            popshow: false
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.pub
                .showPage(this.pageData.ajaxurl, this.pageData)
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
        btnClick(obj) {
            this.$store.commit("getSelcetData", obj);
        },
        // 上拉加载方法
        loadBottom() {
            this.page++;
            this.$refs.loadmore.onBottomLoaded();
            this.getData();
        },
        // 下拉刷新方法
        loadTop() {
            this.cleraDate();
            this.$refs.loadmore.onTopLoaded();
        },
        // 清空所需渲染数据并重新渲染
        cleraDate() {
            this.page = 1;
            this.noMore = false;
            this.noDate = false;
            this.rendering = [];
            this.getData(false);
        }
    },
    components: {
        "mt-loadmore": Loadmore
    }
};
</script>
<style scoped src="@/assets/css/preview.css">