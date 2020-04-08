<template>
    <div class="companyRisk">
        <!-- 标题  -->
        <mt-header title="危险源" fixed>
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
                    <div class="title">
                        <h4>{{index+1+'.'+item.wname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <span>项目:</span>
                            <span>{{item.project}}</span>
                        </div>
                        <div>
                            <span>内容:</span>
                            <span>{{item.content}}</span>
                        </div>
                        <div>
                            <span>影响范围:</span>
                            <span>{{item.yxfwText}}</span>
                        </div>
                        <div>
                            <span>可能导致的危害:</span>
                            <span>{{item.knfsText}}</span>
                        </div>
                        <div>
                            <span>潜在风险:</span>
                            <span>{{item.qzhgText}}</span>
                        </div>
                    </div>
                    <div class="bottom" @click="btnClick(item)">操作</div>
                </div>
                <div v-show="noDate" class="noMoreText">暂无数据</div>
                <div v-show="noMore" class="noMoreText">没有更多数据了</div>
            </mt-loadmore>
        </div>
        <!-- 新增按钮 -->
        <div>
            <mt-button class="btn" type="primary" size="large" @click="addshow=true">新增危险源</mt-button>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div class="popupItem" @click.stop="companyModify">修改</div>
            <div class="popupItem" @click.stop="companyDelete">删除</div>
            <div class="popupItem" @click.stop="appraise">评价</div>
            <div class="popupItem" @click.stop="goRouter">查看管控措施</div>
        </mt-popup>
        <!-- 组件框 -->
        <div>
            <add-company
                :addshow="addshow"
                :fid="$route.query.fid"
                @popupClose="addshow=false"
                @addSuc="cleraData"
            ></add-company>
            <modify-company
                :modShow="modShow"
                :selectData="selectData"
                @popupClose="modShow=false"
                @suc="cleraData"
            ></modify-company>
            <delete-company
                :delShow="delShow"
                :wid="selectData.wid"
                @popupClose="delShow=false"
                @suc="cleraData"
            ></delete-company>
            <company-approve
                :appShow="approveShow"
                :selectData="selectData"
                @popupClose="approveShow=false"
            ></company-approve>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import { Popup, Loadmore } from "mint-ui";
// 增删改框
import addCompany from "@/components/risk/company/addCompany";
import modifyCompany from "@/components/risk/company/modifyCompany";
import deleteCompany from "@/components/risk/company/deleteCompany";
// 评价框
import companyApprove from "@/components/risk/company/companyApprove";
export default {
    name: "companyRisk",
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
            modShow: false,
            delShow: false,
            approveShow: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.risk
                .getCompanyRisk({
                    rows: 10,
                    page: this.page,
                    "bean.fid": this.$route.query.fid,
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
            this.selectData = obj;
            this.popshow = true;
        },
        // 修改按钮点击
        companyModify() {
            this.popshow = false;
            this.modShow = true;
        },
        // 删除按钮点击
        companyDelete() {
            this.popshow = false;
            this.delShow = true;
        },
        // 评价按钮点击
        appraise() {
            this.popshow = false;
            this.approveShow = true;
        },
        // 将接口返回的 影响范围 可能导致的危害 潜在风险转换为文字
        dealRendering(res) {
            let yxfwArr = this.yxfwSlots[0].values;
            let knfsArr = this.knfsSlots[0].values;
            let qzhgArr = this.qzhgSlots[0].values;
            res.forEach(element => {
                yxfwArr.forEach(item => {
                    if (element.yxfw == item.id) {
                        element.yxfwText = item.text;
                    }
                });
                knfsArr.forEach(item => {
                    if (element.knfs == item.id) {
                        element.knfsText = item.text;
                    }
                });
                qzhgArr.forEach(item => {
                    if (element.qzhg == item.id) {
                        element.qzhgText = item.text;
                    }
                });
            });
            return res;
        },
        // 跳转至管控措施
        goRouter() {
            this.$router.push({
                path: "/risk/measure",
                query: {
                    wid: this.selectData.wid
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
        "mt-popup": Popup,
        addCompany,
        modifyCompany,
        deleteCompany,
        companyApprove
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>