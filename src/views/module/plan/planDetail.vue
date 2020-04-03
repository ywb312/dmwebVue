<template>
    <div class="planDetail">
        <!-- 标题  -->
        <mt-header title="检查记录详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div>
            <div class="topPage">
                <div>
                    计划名称:
                    <span>{{selcetData.cpname}}</span>
                </div>
                <div>
                    检查时间:
                    <span>{{selcetData.checkend}}</span>
                </div>
                <div>
                    作业地点:
                    <span>{{selcetData.zydd}}</span>
                </div>
                <div>
                    检查人员:
                    <span>{{selcetData.tbr}}</span>
                </div>
                <div>
                    <span>检查结果</span>
                </div>
            </div>
            <div>
                <mt-loadmore
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :auto-fill="allLoaded"
                    bottomPullText="正在加载更多..."
                    ref="loadmore"
                >
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="main">
                            <div>
                                <span>管控措施: {{item.tbr}}</span>
                            </div>
                            <div>
                                <span>危险源: {{item.checkend}}</span>
                            </div>
                            <div>
                                <span>检查结果: {{item.checkdeadline}}</span>
                            </div>
                        </div>
                    </div>
                </mt-loadmore>
                <div v-show="noDate" class="noMoreText">暂无数据</div>
                <div v-show="noMore" class="noMoreText">没有更多数据了</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import { Toast } from "mint-ui";
export default {
    name: "planDetail",
    data() {
        return {
            rendering: [],
            allLoaded:false,
            noDate:false,
            noMore:false,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.plan
                .doDetail({ "bean.cpid": this.selcetData.cpid })
                .then(res => {
                    if (!res.entity) {
                        return;
                    }
                    // 判断rows是否返回数据
                    if (res.entity.length != 0) {
                        this.rendering = res.entity;
                        this.allLoaded = true;
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
    },
    computed: {
        selcetData() {
            return this.$store.state.selcetData;
        }
    },
    components: {
        Loadmore,
        "mt-loadmore": Loadmore
    }
};
</script>
<style scoped src="@/assets/css/preview.css"/>
<style scoped>
.topPage {
    position: sticky;
    top: 1.1rem;
    z-index: 100;
    background: white;
}
.topPage span {
    color: #2585cf;
}
.topPage div {
    padding: 0.1rem 0.3rem;
}
</style>