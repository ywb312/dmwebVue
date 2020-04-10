<template>
    <div class="auditDetailListAn page">
        <mt-header title="审核列表" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
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
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:40px">
                            <mt-badge size="normal">{{item.fxtypeText}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>1.{{item.wname}}</span>
                            <span>
                                <mt-badge size="normal">{{item.stateText}}</mt-badge>
                            </span>
                        </div>
                        <div v-for="(n,m) in item.child" :key="m">
                            <span>{{m+2+"."+n.wname}}</span>
                            <span>
                                <mt-badge size="normal">{{item.stateText}}</mt-badge>
                            </span>
                        </div>
                    </div>
                    <div class="bottom" @click="btnClick(item)">操作</div>
                </div>
                <div v-show="noDate" class="noMoreText">暂无数据</div>
                <van-divider v-show="noMore">没有更多数据了</van-divider>
            </mt-loadmore>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <mt-popup v-model="popshow" popup-transition="popup-fade" closeOnClickModal="true">
            <div v-if="selectData.state == 'SHZT004' || selectData.state == 'SHZT001'">
                <div class="popupItem" @click.stop="auditPass">审核通过</div>
            </div>
            <div v-if="selectData.state == 'SHZT002'&&selectData.wid">
                <div class="popupItem" @click.stop="appraise">评价</div>
                <div class="popupItem" @click.stop="goMeasure">管控措施</div>
            </div>
            <div class="popupItem" @click.stop="goDetail">查看详情</div>
        </mt-popup>
        <!-- 组件框 -->
        <div>
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
import { Popup, Loadmore, Toast } from "mint-ui";
// 评价框
import companyApprove from "@/components/risk/company/companyApprove";
export default {
    name: "auditDetailListAn",
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
            popshow: false,
            approveShow: false,
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
            ],
            selectData: {}
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 每项按钮点击事件
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.popshow = true;
            this.selectData = obj;
        },
        // 审核通过/不通过
        auditPass() {
            let obj = {
                "bean.auditid": this.selectData.auditid
            };
            this.$api.risk.auidtPassAn(obj).then(res => {
                this.postSuccess();
            });
        },
        // 评价框显示
        appraise() {
            this.popshow = false;
            this.approveShow = true;
        },
        // 跳转到管控措施页
        goMeasure() {
            this.popshow = false;
            this.$router.push({
                path: "/risk/measure",
                query: {
                    wid: this.$route.query.auditid
                }
            });
        },
        // 查看详情按钮
        goDetail() {
            this.popshow = false;
            this.$router.push({
                path: "/risk/auditDetail"
            });
        },
        // 获取当前页面数据函数
        getData(more = true) {
            this.$api.risk
                .getAuditDetailAn({
                    "bean.deptid": this.$route.query.deptid,
                    "bean.param": this.$route.query.auditid,
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
        // 提示框操作成功
        postSuccess() {
            this.popshow = false;
            this.cleraData();
            Toast({
                message: "操作成功",
                position: "bottom",
                duration: 2000
            });
        },
        // 设置返还参数
        setRes(res) {
            let self = this;
            let returnArr = [];
            // 先对数组进行排序
            let sortArr = res.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
            // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
            sortArr.forEach((item, index, arr) => {
                self.$common.codeToText(
                    item,
                    "fxtype",
                    self.fxtypeSlots[0].values
                );
                self.$common.codeToText(item, "state", self.stateArr);
                if (index == 0) {
                    item.child = [];
                    returnArr.push(item);
                } else if (
                    item.name == arr[index - 1].name &&
                    item.fxtype == arr[index - 1].fxtype
                ) {
                    returnArr[returnArr.length - 1].child.push(item);
                } else {
                    item.child = [];
                    returnArr.push(item);
                }
            });
            return returnArr;
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
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        "mt-loadmore": Loadmore,
        "mt-popup": Popup,
        companyApprove
    },
    beforeRouteLeave(to, from, next) {
        if (to.name != "risk") {
            //不是list , 缓存
            from.meta.keepAlive = true;
        } else {
            //list列表页,不缓存
            from.meta.keepAlive = false;
            this.$destroy();
        }
        next();
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>