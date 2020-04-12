<template>
    <div class="plantRisk">
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            bottomPullText="正在加载更多..."
            ref="loadmore"
        >
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="title">
                    <h4>{{index+1+'.'+item.name}}</h4>
                    <!-- <p style="min-width:40px">
                        <mt-badge size="small">{{item.checktype}}</mt-badge>
                    </p>-->
                </div>
                <div class="main">
                    <div>
                        <span>风险点类型:</span>
                        <span>{{item.fxtext}}</span>
                    </div>
                    <div>
                        <span>创建人:</span>
                        <span>{{item.createID}}</span>
                    </div>
                </div>
                <div class="bottom" @click="btnClick(item)">操作</div>
            </div>
        </mt-loadmore>
        <div v-show="noData" class="noMoreText">暂无数据</div>
        <van-divider v-show="noMore">没有更多数据了</van-divider>
        <!-- 新增按钮 -->
        <div>
            <mt-button class="btn" type="primary" size="large" @click="addRisk">新增风险点</mt-button>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem" @click.stop="riskModifySave">修改</div>
            <div class="popupItem" @click.stop="riskDelete">删除</div>
            <div class="popupItem" @click.stop="goRouter">查看危险源</div>
        </mt-popup>
        <div>
            <add-risk :addshow="addshow" @popupClose="addshow=false" @addSuc="cleraData"></add-risk>
            <modifyRisk
                :modShow="modShow"
                :selectData="selectData"
                @popupClose="modShow=false"
                @suc="cleraData"
            ></modifyRisk>
            <delete-risk
                :delShow="delShow"
                :fid="selectData.fid"
                @popupClose="delShow=false"
                @suc="cleraData"
            ></delete-risk>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Popup, Loadmore } from "mint-ui";
import addRisk from "@/components/risk/risk/addRisk";
import modifyRisk from "@/components/risk/risk/modifyRisk";
import deleteRisk from "@/components/risk/risk/deleteRisk";
export default {
    name: "plantRisk",
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
            // 选中的对象
            selectData: {},
            // 控制操作模态框的显示
            popshow: false,
            // 增删改查组件的显示
            addshow: false,
            modShow: false,
            delShow: false
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
            this.$api.risk
                .getRisk({
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
                        res.rows.forEach(element => {
                            this.$common.codeToText(
                                element,
                                "fxtype",
                                this.fxtypeSlots[0].values
                            );
                        });
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
                        this.noData = true;
                        this.allLoaded = true;
                    }
                });
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
        // 新增风险点
        addRisk() {
            this.addshow = true;
        },
        // 修改风险点
        riskModifySave() {
            this.popshow = false;
            this.modShow = true;
        },
        // 删除风险点
        riskDelete() {
            this.popshow = false;
            this.delShow = true;
        },
        // 危险源页
        goRouter() {
            this.$router.push({
                path: "/risk/companyRisk",
                query: {
                    fid: this.selectData.fid
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
            this.noData = false;
            this.rendering = [];
            this.getData(false);
        }
    },
    computed: {
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        "mt-loadmore": Loadmore,
        "mt-popup": Popup,
        addRisk,
        modifyRisk,
        deleteRisk
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>