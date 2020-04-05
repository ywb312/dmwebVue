<template>
    <div class="measure">
        <!-- 标题  -->
        <mt-header title="管控措施" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 渲染当前页面 -->
        <div class="wrap">
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
                            <span>管控措施名称:</span>
                            <span>{{item.gname}}</span>
                        </div>
                        <div>
                            <span>管控措施类型:</span>
                            <span>{{item.gtypeText}}</span>
                        </div>
                    </div>
                    <div class="bottom" @click="btnClick(item)">操作</div>
                </div>
                <div v-show="noDate" class="noMoreText">暂无数据</div>
                <div v-show="noMore" class="noMoreText">没有更多数据了</div>
            </mt-loadmore>
        </div>
        <!-- 新增按钮 -->
        <mt-button class="btn" type="primary" size="large" @click="addshow=true">新增管控措施</mt-button>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem" @click.stop="companyModify">修改</div>
            <div class="popupItem" @click.stop="measureDelete">删除</div>
            <div class="popupItem" @click.stop="goRouter">查看排查计划</div>
        </mt-popup>
        <!-- 组件框 -->
        <div>
            <add-measure
                :addshow="addshow"
                :wid="$route.query.wid"
                @popupClose="addshow=false"
                @addSuc="cleraData"
            ></add-measure>
            <modify-measure
                :modShow="modShow"
                :selcetData="selcetData"
                @popupClose="modShow=false"
                @suc="cleraData"
            ></modify-measure>
            <delete-measure
                :delShow="delShow"
                :gid="selcetData.gid"
                @popupClose="delShow=false"
                @suc="cleraData"
            ></delete-measure>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Popup, Loadmore } from "mint-ui";
// 增删改框
import addMeasure from "@/components/risk/measure/addMeasure";
import modifyMeasure from "@/components/risk/measure/modifyMeasure";
import deleteMeasure from "@/components/risk/measure/deleteMeasure";
export default {
    name: "measure",
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
            // 选中的对象
            selcetData: {},
            // 控制操作模态框的显示
            popshow: false,
            // 增删改查组件的显示
            addshow: false,
            modShow: false,
            delShow: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.risk
                .getMeasure({
                    rows: 10,
                    page: this.page,
                    "bean.wid": this.$route.query.wid,
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
                            this.rendering.push(
                                ...this.dealRendering(res.rows)
                            );
                        } else {
                            this.rendering = this.dealRendering(res.rows);
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
        // 操作按钮点击事件
        btnClick(obj) {
            this.selcetData = obj;
            this.popshow = true;
        },
        // 修改按钮点击
        companyModify() {
            this.popshow = false;
            this.modShow = true;
        },
        // 删除按钮点击
        measureDelete() {
            this.popshow = false;
            this.delShow = true;
        },
        // 将接口返回的 影响范围 可能导致的危害 潜在风险转换为文字
        dealRendering(res) {
            let gTypeArr = this.gTypeSlots[0].values;
            res.forEach(element => {
                gTypeArr.forEach(item => {
                    if (element.gtype == item.id) {
                        element.gtypeText = item.text;
                    }
                });
            });
            return res;
        },
        // 危险源页
        goRouter() {
            this.$router.push({
                path: "/risk/examine",
                query: {
                    gid: this.selcetData.gid
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
            this.noDate = false;
            this.rendering = [];
            this.getData(false);
        }
    },
    computed: {
        gTypeSlots() {
            return this.$store.state.gTypeSlots;
        }
    },
    components: {
        "mt-loadmore": Loadmore,
        "mt-popup": Popup,
        addMeasure,
        modifyMeasure,
        deleteMeasure
    }
};
</script>
<style scoped>
.popupItem {
    width: 4.8rem;
    padding: 0.2rem 0.2rem;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid rgb(230, 230, 230);
}
.popupItem:last-of-type {
    border-bottom: none;
}
.btn {
    background-color: #2585cf;
    position: fixed;
    bottom: 0.1rem;
}
</style>
<style scoped src="@/assets/css/public.css"/>