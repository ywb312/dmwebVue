<template>
    <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="cleraData">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <slot name="views"></slot>
        </van-list>
        <van-empty v-show="noData" description="暂无数据" />
        <van-empty image="error" v-show="noRes" description="数据有误" />
    </van-pull-refresh>
</template>
<script>
export default {
    name: "ViewBox",
    data() {
        return {
            page: 1,
            // 渲染的数据
            rendering: [],
            // 停止加载
            loading: false,
            // 停止上拉加
            refreshing: false,
            // 没有更多数据了
            finished: false,
            // 暂无数据
            noData: false,
            // 数据有误
            noRes: false
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
                    if (typeof res != "object") {
                        this.noRes = true;
                        return;
                    }
                    // 有数据和没数据都要返回
                    if (res.rows && res.rows.length != 0) {
                        // 判断是新增还是替换  默认为新增
                        if (more) {
                            this.loading = false;
                            this.rendering.push(...res.rows);
                        } else {
                            this.refreshing = false;
                            this.rendering = res.rows;
                        }
                        this.$emit("getRendering", this.rendering);
                        // 返回数据小于10条 停止上拉刷新
                        if (res.rows.length < 10) {
                            this.finished = true;
                        }
                    } else {
                        if (res.records == 0) {
                            this.noData = true;
                            this.$emit("getRendering", this.rendering);
                        }
                        return;
                    }
                });
        },
        // 上拉加载方法
        onLoad() {
            this.page++;
            this.getData();
        },
        // 清空所需渲染数据并重新渲染 下拉直接执行此方法
        cleraData() {
            this.page = 1;
            this.finished = false;
            this.noData = false;
            this.rendering = [];
            this.getData(false);
        }
    },
    components: {}
};
</script>
<style scoped src="@/assets/css/public.css"/>