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
                        <span>风险点类型: {{item.fxtext}}</span>
                    </div>
                    <div>
                        <span>创建人: {{item.createID}}</span>
                    </div>
                </div>
                <div class="bottom" @click="btnClick(item)">操作</div>
            </div>
        </mt-loadmore>
        <div v-show="noDate" class="noMoreText">暂无数据</div>
        <div v-show="noMore" class="noMoreText">没有更多数据了</div>
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
                :fid="selcetData.fid"
                @popupClose="modShow=false"
                @suc="cleraData"
            ></modifyRisk>
            <delete-risk
                :delShow="delShow"
                :fid="selcetData.fid"
                @popupClose="delShow=false"
                @suc="cleraData"
            ></delete-risk>
        </div>
        <mt-button class="btn" type="primary" size="large" @click="addRisk">新增风险点</mt-button>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Popup, Loadmore } from "mint-ui";
import addRisk from "@/components/risk/addRisk";
import modifyRisk from "@/components/risk/modifyRisk";
import deleteRisk from "@/components/risk/deleteRisk";
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
                .getRisk(this.pageData.ajaxurl, {
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
                            switch (element.fxtype) {
                                case "FXDLX001":
                                    element.fxtext = "作业活动";
                                    break;
                                case "FXDLX002":
                                    element.fxtext = "设备";
                                    break;
                                case "FXDLX003":
                                    element.fxtext = "设施";
                                    break;
                                case "FXDLX004":
                                    element.fxtext = "工艺流程";
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
                path: "/companyRisk",
                query: {
                    fid: this.selcetData.fid
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
    components: {
        "mt-loadmore": Loadmore,
        "mt-popup": Popup,
        addRisk,
        modifyRisk,
        deleteRisk
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