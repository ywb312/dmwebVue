<template>
    <div class="collectChe">
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
        >
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:40px">
                            <mt-badge size="normal">{{item.fxtypeText}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>危险源名称: {{item.wname}}</span>
                        </div>
                        <div>
                            <span>危险源责任单位: {{item.deptname}}</span>
                        </div>
                        <div>
                            <span>
                                风险等级:
                                <mt-badge
                                    :type="item.grade == 1?'error':item.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                    size="normal"
                                >{{item.grade+"级"}}</mt-badge>
                            </span>
                        </div>
                        <div>
                            <span>项目: {{item.project}}</span>
                        </div>
                        <div>
                            <span>内容: {{item.content}}</span>
                        </div>
                        <div>
                            <span>影响范围: {{item.yxfwText}}</span>
                        </div>
                        <div>
                            <span>可能导致的事故: {{item.knfsText}}</span>
                        </div>
                        <div>
                            <span>潜在后果: {{item.qzhgText}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="noData" class="noMoreText">暂无数据</div>
            <van-divider v-show="noMore">没有更多数据了</van-divider>
        </mt-loadmore>
        <!-- 新增按钮 -->
        <div>
            <mt-button class="btn" type="primary" size="large" @click="upAffirm">提交辨识</mt-button>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Loadmore, Toast } from "mint-ui";
export default {
    name: "collectChe",
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
            noMore: false,
            stateArr: [
                {
                    text: "未审核",
                    id: "SHZT001"
                },
                {
                    text: "审核通过",
                    id: "SHZT002"
                },
                {
                    text: "审核未通过",
                    id: "SHZT003"
                },
                {
                    text: "待审核",
                    id: "SHZT004"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    created() {
        this.getData();
    },
    props: ["pageData"],
    methods: {
        // 处理请求的数据
        setRes(arr) {
            arr.forEach(element => {
                this.$common.codeToText(
                    element,
                    "knfs",
                    this.knfsSlots[0].values
                );
                this.$common.codeToText(
                    element,
                    "yxfw",
                    this.yxfwSlots[0].values
                );
                this.$common.codeToText(
                    element,
                    "qzhg",
                    this.qzhgSlots[0].values
                );
                this.$common.codeToText(
                    element,
                    "fxtype",
                    this.fxtypeSlots[0].values
                );
            });
            return arr;
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.pub
                .showPage(this.pageData.ajaxUrl, {
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
                        if (data.length < 10) {
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
        // 提交辨识
        upAffirm() {
            this.$api.pub
                .showPage(this.pageData.upUrl, {
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    Toast({
                        message: "提交成功",
                        position: "bottom",
                        duration: 2000
                    });
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
        knfsSlots() {
            return this.$store.state.knfsSlots;
        },
        yxfwSlots() {
            return this.$store.state.yxfwSlots;
        },
        qzhgSlots() {
            return this.$store.state.qzhgSlots;
        },
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