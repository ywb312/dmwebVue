<template>
    <van-pull-refresh
        style="min-height: 500px"
        v-model="refreshing"
        success-text="刷新成功"
        @refresh="clearData"
    >
        <div class="recordSum">总条数:{{ this.records }}条</div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
        >
            <slot name="views"></slot>
            <van-empty v-show="noData" description="暂无数据" />
            <van-empty image="error" v-show="noRes" description="数据有误" />
        </van-list>
    </van-pull-refresh>
</template>
<script>
export default {
    name: "ViewBox",
    data() {
        return {
            // 页码
            page: 1,
            // 渲染的数据
            rendering: [],
            // 上拉加载
            loading: false,
            // 下拉刷新
            refreshing: false,
            // 没有更多数据了
            finished: false,
            // 暂无数据
            noData: false,
            // 数据有误
            noRes: false,
            // 请求出错
            error: false,
            // 避免一直执行onLoad
            canLoad: true,
            // 正在请求中,不可加载
            postIng: false,
            // 总条数
            records: 0,
        };
    },
    // pageData父组件传来的配置项
    props: {
        postData: {
            type: Object,
            default: {},
        },
    },
    created() {
        this.getData();
    },
    methods: {
        // 设置请求数据
        setObj() {
            let obj = {
                rows: 10,
                page: this.page,
            };
            for (const key in this.postData.obj) {
                if (this.postData.obj[key] != "") {
                    obj[key] = this.postData.obj[key];
                }
            }
            return obj;
        },
        // 请求、渲染函数
        getData(more = true) {
            this.postIng = true;
            let obj = this.setObj();
            this.$api.pub
                .showPage(this.postData.url, obj)
                .then((res) => {
                    this.canLoad = true;
                    this.refreshing = false;
                    this.loading = false;
                    this.postIng = false;
                    // 数据有误
                    if (typeof res != "object") {
                        this.noRes = true;
                        return;
                    }
                    // 总条数赋值
                    this.records = res.records;
                    this.$emit("getBacklog", res);
                    // 数据为空
                    if (res.records == 0 && res.rows.length == 0) {
                        this.canLoad = false;
                        this.noData = true;
                        this.$emit("getRendering", this.rendering);
                        return;
                    }
                    // 有数据
                    if (res.rows && res.rows.length != 0) {
                        // 判断是新增还是替换  默认为新增
                        if (more) {
                            // 向后新增
                            this.rendering.push(...res.rows);
                        } else {
                            // 替换旧数据
                            this.rendering = res.rows;
                        }
                        this.$emit("getRendering", this.rendering);
                        // 返回数据小于obj.rows(默认10条) 停止上拉刷新
                        if (
                            res.rows.length < obj.rows ||
                            res.records < obj.rows
                        ) {
                            this.finished = true;
                        }
                    }
                })
                .catch(() => {
                    this.error = true;
                });
        },
        // 上拉加载方法
        onLoad() {
            if (!this.canLoad || this.postIng) {
                this.loading = false;
                return;
            }
            this.page++;
            this.getData();
        },
        // 清空所需渲染数据并重新渲染 下拉直接执行此方法
        clearData() {
            this.page = 1;
            this.finished = false;
            this.noData = false;
            this.noRes = false;
            this.canLoad = false;
            this.rendering = [];
            this.getData();
        },
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.recordSum {
    margin-left: 0.4rem;
    padding: 0.2rem 0;
    font-weight: bold;
}
</style>