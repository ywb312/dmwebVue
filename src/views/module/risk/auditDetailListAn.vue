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
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:40px">
                            <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div class="noFlex" @click="btnClick(item)">
                            <div>
                                <p>
                                    <span class="main_title">{{"("+(index+1)+")"}}</span>
                                    <span class="main_val">{{item.wname}}</span>
                                </p>
                                <p class="main_tag">
                                    <van-tag size="large" round type="primary">{{item.stateText}}</van-tag>
                                </p>
                            </div>
                            <div>
                                <p>可能性:{{item.l}}|严重性:{{item.e}}|频繁度:{{item.c}}</p>
                                <p class="main_tag">
                                    <van-tag
                                        size="large"
                                        round
                                        :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                        :color="item.grade == 3?'yellow':''"
                                    >{{item.grade+"级"}}</van-tag>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span class="main_title">{{item.gtypeText+":"}}</span>
                                    <span class="main_val">{{item.gname}}</span>
                                </p>
                            </div>
                        </div>
                        <div
                            class="noFlex"
                            v-for="(n,m) in item.child"
                            :key="m"
                            @click="btnClick(n)"
                        >
                            <div>
                                <p>
                                    <span class="main_title">{{"("+(m+2)+")"}}</span>
                                    <span class="main_val">{{n.wname}}</span>
                                </p>
                                <p class="main_tag">
                                    <van-tag size="large" round type="primary">{{n.stateText}}</van-tag>
                                </p>
                            </div>
                            <div>
                                <p>可能性:{{n.l}}|严重性:{{n.e}}|频繁度:{{n.c}}</p>
                                <p class="main_tag">
                                    <van-tag
                                        size="large"
                                        round
                                        :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                        :color="item.grade == 3?'yellow':''"
                                    >{{item.grade+"级"}}</van-tag>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span class="main_title">{{n.gtypeText+":"}}</span>
                                    <span class="main_val">{{n.gname}}</span>
                                </p>
                            </div>
                            <div v-for="(key,val) in n.child" :key="val">
                                <p>
                                    <span class="main_title">{{key.gtypeText+":"}}</span>
                                    <span class="main_val">{{key.gname}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet v-model="popshow" cancel-text="取消" close-on-click-action>
            <div
                class="content"
                v-show="selectData.state == 'SHZT004' || selectData.state == 'SHZT001'"
                @click="auditPass"
            >审核通过</div>
            <div
                class="content"
                v-show="selectData.state == 'SHZT002'&&selectData.wid"
                @click="approveClick"
            >评价</div>
            <div
                class="content"
                v-show="selectData.state == 'SHZT002'&&selectData.wid"
                @click="goMeaSure"
            >管控措施</div>
            <div class="content" @click="goDetail">查看详情</div>
        </van-action-sheet>
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
import ViewBox from "@/components/pub/ViewBox.vue";
// 评价框
import companyApprove from "@/components/risk/company/companyApprove";
export default {
    name: "auditDetailListAn",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/shpjlist.action",
                obj: {
                    "bean.deptid": this.$route.query.deptid,
                    "bean.param": this.$route.query.auditid
                }
            },
            popshow: false,
            approveShow: false,
            selectData: {}
        };
    },
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            let _self = this;
            this.setRes(arr).then(res => {
                _self.rendering = res;
            });
        },
        // 每项按钮点击事件
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.popshow = true;
            console.log(obj);
            this.selectData = obj;
        },
        approveClick() {
            this.popshow = false;
            this.approveShow = true;
        },
        goMeaSure() {
            this.popshow = false;
            this.$router.push({
                path: "/risk/measure",
                query: {
                    wid: this.$route.query.auditid
                }
            });
        },
        goDetail() {
            this.popshow = false;
            this.$router.push({
                path: "/risk/auditDetail"
            });
        },
        // 审核通过/不通过
        auditPass() {
            let obj = {
                "bean.auditid": this.selectData.auditid
            };
            this.$api.risk.auidtPassAn(obj).then(res => {
                let data = eval("(" + res + ")");
                // 数据有误
                if (!data.success) {
                    this.$toast("提交不成功");
                    return;
                }
                this.popshow = false;
                this.$toast({
                    message: "操作成功",
                    position: "bottom"
                });
            });
        },
        // 设置返还参数
        setRes(arr) {
            let _self = this;
            let returnArr = [];
            function getItem(key, val, arr) {
                return arr.findIndex(item => item[key] == val);
            }
            // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
            return Promise.all([
                _self.$common.comboList({ sourcename: "FXDLX" }),
                _self.$common.comboList({ sourcename: "SHZT" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                arr.forEach((item, index, arr) => {
                    _self.$common.code2Text(item, "fxtype", res[0]);
                    _self.$common.code2Text(item, "state", res[1]);
                    _self.$common.code2Text(item, "gtype", res[2]);
                    let fidIndex = getItem("fid", item.fid, returnArr);
                    if (fidIndex == -1) {
                        // 风险点不一致 向后新增
                        item.child = [];
                        returnArr.push(item);
                    } else if (fidIndex >= 0) {
                        // 风险点一致 匹配危险源
                        let widArr = returnArr[fidIndex].child;
                        let widIndex = getItem("wid", item.wid, widArr);
                        if (widIndex >= 0) {
                            widArr[widIndex].child.push(item);
                        } else if (widIndex == -1) {
                            item.child = [];
                            widArr.push(item);
                        }
                    }
                });
                return returnArr;
            });
        },
        // 清空数据 重新加载
        clearData() {
            this.$refs.view.cleraData();
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