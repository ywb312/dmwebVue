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
                    <h4>{{index+1+'.'+item.deptname}}</h4>
                    <p style="min-width:40px">
                        <mt-badge size="small">{{item.stateText}}</mt-badge>
                    </p>
                </div>
                <div class="main">
                    <div>
                        <span>提交时间:</span>
                        <span>{{item.createdate}}</span>
                    </div>
                    <div>
                        <span>审核时间:</span>
                        <span>{{item.auditdate}}</span>
                    </div>
                </div>
                <div class="bottom" @click="btnClick(item)">操作</div>
            </div>
        </mt-loadmore>
        <div v-show="noDate" class="noMoreText">暂无数据</div>
        <div v-show="noMore" class="noMoreText">没有更多数据了</div>
        <!-- 新增按钮 -->
        <mt-button class="btn" type="primary" size="large" @click="addRisk">新增风险点</mt-button>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem" @click.stop="riskModifySave">修改</div>
            <div class="popupItem" @click.stop="riskDelete">删除</div>
            <div class="popupItem" @click.stop="goRouter">查看危险源</div>
        </mt-popup>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Popup, Loadmore } from "mint-ui";
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
            noDate: false,
            // 没有更多数据了
            noMore: false,
            // 选中的对象
            selcetData: {},
            // 控制操作模态框的显示
            popshow: false
            // 增删改查组件的显示
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
                .getAudit({
                    "bean.type": "SH002",
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
                            switch (element.state) {
                                case "SHZT001":
                                    element.stateText = "未审核";
                                    break;
                                case "SHZT002":
                                    element.stateText = "审核通过";
                                    break;
                                case "SHZT003":
                                    element.stateText = "审核未通过";
                                    break;
                                case "SHZT004":
                                    element.stateText = "待审核";
                                    break;
                                default:
                                    break;
                            }
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
        // 危险源页
        goRouter() {
            // this.$router.push({
            //     path: "/risk/companyRisk",
            //     query: {
            //         fid: this.selcetData.fid
            //     }
            // });
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
        "mt-popup": Popup
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