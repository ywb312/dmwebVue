<template>
    <div class="riskBoard">
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
                    <h4>{{index+1+'.'+item.wname}}</h4>
                </div>
                <div class="main">
                    <div>
                        <p>事故类型: {{item.knfsText}}</p>
                        <p>潜在后果: {{item.qzhgText}}</p>
                    </div>
                    <div>
                        <p>影响范围: {{item.yxfwText}}</p>
                        <p>责任人: {{item.zrr?item.zrr:""}}</p>
                    </div>
                    <div>
                        <p>环节或部位: {{item.part}}</p>
                    </div>
                    <div>
                        <p>有效期: {{item.validity}}</p>
                    </div>
                    <div>
                        <p>报告电话: {{item.reportphone}}</p>
                    </div>
                </div>
            </div>
            <div v-show="noDate" class="noMoreText">暂无数据</div>
            <div v-show="noMore" class="noMoreText">没有更多数据了</div>
        </mt-loadmore>
        <!-- 组件框 -->
        <div>
            <board-modify
                :modShow="modShow"
                :cid="seletData.cid"
                @popupClose="modShow=false"
                @suc="cleraData"
            ></board-modify>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Loadmore } from "mint-ui";
import boardModify from "@/components/risk/board/boardModify";
export default {
    name: "riskBoard",
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
            modShow: false,
            seletData: {}
        };
    },
    created() {
        this.getData();
    },
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
            });
            return arr;
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.risk
                .getRiskBoard({
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
                        this.noDate = true;
                        this.allLoaded = true;
                    }
                });
        },
        btnClick(obj) {
            this.seletData = obj;
            this.modShow = true;
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
            this.noDate = false;
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
        }
    },
    components: {
        "mt-loadmore": Loadmore,
        boardModify
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>