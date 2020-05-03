<template>
    <div class="page">
        <van-nav-bar
            title="审核列表"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div
                        class="wrapper"
                        v-for="(item,index) in rendering"
                        :key="index"
                        @click="btnClick(item)"
                    >
                        <div class="title">
                            <h4>{{index+1+'.'+item.name}}</h4>
                            <p style="min-width:40px">
                                <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                            </p>
                        </div>
                        <div class="main">
                            <div>
                                <span>1.{{item.wname}}</span>
                                <span>
                                    <van-tag size="large" round type="primary">{{item.stateText}}</van-tag>
                                </span>
                            </div>
                            <div v-for="(n,m) in item.child" :key="m">
                                <span>{{m+2+"."+n.wname}}</span>
                                <span>
                                    <van-tag size="large" round type="primary">{{item.stateText}}</van-tag>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet v-model="popshow" cancel-text="取消" close-on-click-action>
            <div
                class="content"
                v-show="selectData.state == 'SHZT004' || selectData.state == 'SHZT001'"
                @click="auditPass(true)"
            >审核通过</div>
            <div
                class="content"
                v-show="selectData.state == 'SHZT004' || selectData.state == 'SHZT001'"
                @click="auditPass(false)"
            >审核不通过</div>
            <div class="content" @click="goDetail">查看详情</div>
        </van-action-sheet>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
// 评价框
import companyApprove from "@/components/risk/company/companyApprove";
export default {
    name: "auditDetailList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/cjshlist.action",
                obj: {
                    "bean.param": this.$route.query.auditid
                }
            },
            // 操作面板显示
            popshow: false,
            // 审批状态数组
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
            // 选中项
            selectData: {}
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            this.rendering = this.setRes(arr);
        },
        // 每项点击
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.popshow = true;
            this.selectData = obj;
        },
        // 查看详情按钮点击
        goDetail() {
            this.popshow = false;
            this.$router.push({
                path: "/risk/auditDetail"
            });
        },
        // 审核通过/不通过点击
        auditPass(bol) {
            this.popshow = false;
            let obj = {
                "bean.cid": this.selectData.cid,
                "bean.param": this.$route.query.auditid
            };
            if (bol) {
                this.$api.risk.auditPass(obj).then(res => {
                    this.postSuccess();
                });
            } else {
                this.$api.risk.auditNoPass(obj).then(res => {
                    this.postSuccess();
                });
            }
        },
        // 提示框操作成功
        postSuccess() {
            this.popshow = false;
            this.clearData();
            this.$toast({
                message: "操作成功",
                position: "bottom"
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
                self.$common.code2Text(item, "fxtype", self.fxtypeSlots);
                self.$common.code2Text(item, "state", self.stateArr);
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
        // 清空数据 重新加载
        clearData() {
            this.$refs.view.cleraData();
        }
    },
    computed: {
        fxtypeSlots() {
            return this.$store.state.fxtypeSlots;
        }
    },
    components: {
        ViewBox,
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
<style scoped>
.content {
    padding: 16px 0;
    text-align: center;
}
</style>