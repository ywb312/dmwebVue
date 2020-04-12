<template>
    <div class="dealDanger">
        <!-- 标题  -->
        <mt-header title="隐患处理" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
            <mt-button slot="right" @click="$router.push('/danger/increase')">
                <img src="@/assets/iconfont/add.svg" />
            </mt-button>
        </mt-header>
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
                    <div class="title">
                        <h4>{{index+1+'.'+item.crname}}</h4>
                        <p style="min-width:40px">
                            <mt-badge size="small">{{item.stateText}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>隐患描述:</span>
                            <span>{{item.crdesc}}</span>
                        </div>
                        <div>
                            <span>隐患场所:</span>
                            <span>{{item.craddr}}</span>
                        </div>
                        <div>
                            <span>审批时间:</span>
                            <span>{{item.pcdate}}</span>
                        </div>
                    </div>
                    <div class="bottom" @click="btnClick(item)">操作</div>
                </div>
                <div v-show="noData" class="noMoreText">暂无数据</div>
                <van-divider v-show="noMore">没有更多数据了</van-divider>
            </mt-loadmore>
        </div>
        <!-- 隐藏的组件 -->
        <div>
            <record :compShow="compShow" @popupClose="compShow=false"></record>
        </div>
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem" @click.stop="goDetail">查看详情</div>
            <div class="popupItem" @click.stop="comShow">审批记录</div>
            <div class="popupItem" @click.stop="postDeal('zczg')">自查自改</div>
            <div class="popupItem" @click.stop="postDeal('sbsj')">上报上级</div>
            <div class="popupItem" @click.stop="goAssign">隐患指派</div>
        </mt-popup>
    </div>
</template>
<script>
// 渲染组件
import { Popup, Loadmore } from "mint-ui";
import record from "@/components/danger/record";
export default {
    name: "dealDanger",
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
            // 审批记录操作框
            compShow: false,
            spArr: [
                {
                    id: "SPZT001",
                    text: "审批中"
                },
                {
                    id: "SPZT002",
                    text: "审批通过"
                },
                {
                    id: "SPZT003",
                    text: "审批不通过"
                },
                {
                    id: "SPZT004",
                    text: "未审批"
                },
                {
                    id: "SPZT005",
                    text: "未提交"
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.danger
                .getDeal({
                    "bean.olddate": "0",
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
                                "state",
                                this.spArr
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
        // 查看详情
        goDetail() {
            this.popshow = false;
            this.$router.push({
                path: "/danger/detail"
            });
        },
        // 审批记录
        comShow() {
            this.popshow = false;
            this.compShow = true;
        },
        // 自查自改和上报
        postDeal(type) {
            this.popshow = false;
            let obj = {
                "bean.yhid": this.selectData.yhid
            };
            if (type == "zczg") {
                obj["bean.zgtype"] = "ZGLX002";
            } else if (type == "sbsj") {
                obj["bean.zgtype"] = "ZGLX001";
            }
            this.$api.danger.doexp(obj).then(res => {
                if (res.message) {
                    Toast({
                        message: res.message,
                        position: "bottom",
                        duration: 4000
                    });
                }
            });
        },
        // 去指派
        goAssign() {
            this.popshow = false;
            this.$router.push({
                path: "/danger/assign"
            });
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
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
    components: {
        "mt-loadmore": Loadmore,
        "mt-popup": Popup,
        record
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>