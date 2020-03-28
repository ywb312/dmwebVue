<template>
    <div class="finished">
        <!-- 标题  -->
        <mt-header title="已办事项" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
            class="wrap"
        >
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="title">
                    <h3>{{index+1+"."+item.name}}</h3>
                    <p></p>
                </div>
                <div class="main">
                    <div>
                        <span>{{item.startUserName+"发现的"+item.crname+"进行"+item.taskDefinitionKey+"处理"}}</span>
                        <span style="min-width:70px">{{item.owner}}</span>
                    </div>
                    <div>
                        <span>{{item.createTime}}</span>
                    </div>
                </div>
            </div>
        </mt-loadmore>
        <div v-show="noDate" class="noMoreText">暂无数据</div>
        <div v-show="noMore" class="noMoreText">没有更多数据了</div>
    </div>
</template>
<script>
export default {
    name: "finished",
    data() {
        return {
            // 页码
            page: 1,
            // 渲染数据
            rendering: [],
            // 停止上拉加
            allLoaded: false,
            // 没有数据
            noDate: false,
            // 没有更多数据了
            noMore: false
        };
    },
    created(){
        this.getData();
    },
    methods: {
        getData(more = true) {
            this.$api.work
                .taskList({
                    page: this.page,
                    rows: 10,
                    session: window.localStorage["session_Id"]
                })
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
                            this.$store.commit("setBacklog", res);
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
    }
};
</script>
<style scoped>
</style>