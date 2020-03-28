<template>
    <div class="backlog">
        <!-- 标题  -->
        <mt-header title="待办事项" fixed>
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
            <div class="wrapper" v-for="(item,index) in backlog.rows" :key="index">
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
                <div class="bottom" @click="btnClick(item)">操作</div>
            </div>
        </mt-loadmore>
        <!-- <pop
            :popshow="popshow"
            :everyConfig="everyConfig"
            :selcetData="selcetData"
            @popupClose="popshow=false"
        ></pop>-->
        <div v-show="noDate" class="noMoreText">暂无数据</div>
        <div v-show="noMore" class="noMoreText">没有更多数据了</div>
    </div>
</template>
<script>
import { Loadmore } from "mint-ui";
// import pop from "@/components/pub/previewPopup";
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
            noDate: false,
            // 没有更多数据了
            noMore: false,
            // 控制模态框的显示a
            popshow: false,
            // 选中的列表数据
            selcetData: ""
        };
    },
    created() {
        this.rendering = this.backlog.rows;
        console.log(this.rendering);
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
        // 按钮点击事件popup组件显示
        btnClick(obj) {
            this.selcetData = obj;
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
        },
        
    },
    computed: {
        backlog() {
            return this.$store.state.backlog;
        }
    },
    components: {
        "mt-loadmore": Loadmore
        // pop
    }
};
</script>
<style scoped>
.wrapper {
    border-bottom: solid 1px #ddd;
    margin-bottom: 5px;
}
.title,
.main div {
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 0.4rem;
    background-color: rgb(250, 250, 250);
}
.bottom {
    width: 100%;
    padding: 0.2rem 0.3rem;
    margin-bottom: -1px;
    text-align: center;
    border-top: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    letter-spacing: 0.2rem;
}
.noMoreText {
    width: 100%;
    padding: 0.3rem 0;
    text-align: center;
    color: gray;
}
</style>