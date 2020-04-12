<template>
    <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="allLoaded"
        bottomPullText="正在加载更多..."
        ref="loadmore"
    >
        <slot name="views"></slot>
        <div v-show="noMore">
            <slot name="tip"></slot>
        </div>
        <van-empty v-show="noData" description="暂无数据" />
    </mt-loadmore>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Loadmore } from "mint-ui";
export default {
    name: "ViewBox",
    data() {
        return {
            page: 1,
            // 渲染的数据
            rendering: [],
            // 停止上拉加
            allLoaded: false,
            // 没有更多数据了
            noMore: false,
            noData: false
        };
    },
    // pageData父组件传来的配置项
    props: {
        postData: {
            type: Object,
            default: {}
        }
    },
    created() {
        this.getData();
    },
    methods: {
        setObj() {
            let obj = {
                rows: 10,
                page: this.page,
                session: window.localStorage["session_Id"]
            };
            for (const key in this.postData.obj) {
                if (this.postData.obj[key] != "") {
                    obj[key] = this.postData.obj[key];
                }
            }
            return obj;
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.pub
                .showPage(this.postData.url, this.setObj())
                .then(res => {
                    // 有数据和没数据都要返回
                    if (res.rows && res.rows.length != 0) {
                        // 判断是新增还是替换  默认为新增
                        if (more) {
                            this.rendering.push(...res.rows);
                        } else {
                            this.rendering = res.rows;
                        }
                        this.$emit("getRendering", this.rendering);
                        // 返回数据小于10条 停止上拉刷新
                        if (res.rows.length < 10) {
                            this.allLoaded = true;
                            this.noMore = true;
                        } else {
                            this.allLoaded = false;
                            this.noMore = false;
                        }
                    } else {
                        if (res.records == 0) {
                            this.noData = true;
                            this.$emit("getRendering", this.rendering);
                        }
                        this.allLoaded = true;
                        return;
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