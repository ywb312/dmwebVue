<template>
    <div class="examine page">
        <!-- 标题  -->
        <mt-header title="排查信息" fixed>
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
                            <span>频率:</span>
                            <span>{{item.rate}}</span>
                        </div>
                        <div>
                            <span>单位:</span>
                            <span>{{item.deptname}}</span>
                        </div>
                    </div>
                    <div class="bottom" @click="btnClick(item)">操作</div>
                </div>
                <div v-show="noDate" class="noMoreText">暂无数据</div>
                <van-divider v-show="noMore">没有更多数据了</van-divider>
            </mt-loadmore>
        </div>
        <!-- 新增按钮 -->
        <div>
            <mt-button class="btn" type="primary" size="large" @click="addshow=true">新增排查</mt-button>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem" @click.stop="measureDelete">删除</div>
        </mt-popup>
        <!-- 组件框 -->
        <div>
            <add-examine
                :addshow="addshow"
                :gid="$route.query.gid"
                @popupClose="addshow=false"
                @addSuc="cleraData"
            ></add-examine>
            <delete-examine
                :delShow="delShow"
                :cprid="selectData.cprid"
                @popupClose="delShow=false"
                @suc="cleraData"
            ></delete-examine>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Popup, Loadmore } from "mint-ui";
// 增删改框
import addExamine from "@/components/risk/examine/addExamine";
import deleteExamine from "@/components/risk/examine/deleteExamine";
export default {
    name: "examine",
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
            selectData: {},
            // 控制操作模态框的显示
            popshow: false,
            // 增删改查组件的显示
            addshow: false,
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
                .getExamine({
                    rows: 10,
                    page: this.page,
                    "bean.gid": this.$route.query.gid,
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
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
        // 删除按钮点击
        measureDelete() {
            this.popshow = false;
            this.delShow = true;
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
    components: {
        "mt-loadmore": Loadmore,
        "mt-popup": Popup,
        addExamine,
        deleteExamine
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>