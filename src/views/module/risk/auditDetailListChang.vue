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
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="title">
                            <h4>{{index+1+'.'+item.name}}</h4>
                            <p style="min-width:40px">
                                <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                            </p>
                        </div>
                        <div class="main">
                            <div
                                class="noFlex"
                                v-for="(n,m) in item.child"
                                :key="m"
                                @click="btnClick(n,'wid')"
                            >
                                <div>
                                    <p>
                                        <span class="main_title">{{"("+(m+1)+")"}}</span>
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
                                <div
                                    v-for="(key,val) in n.child"
                                    @click.stop="btnClick(key,'gid')"
                                    :key="val"
                                >
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
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet v-model="popshow" cancel-text="取消" close-on-click-action>
            <div v-if="selectData.state == 'SHZT004' || selectData.state == 'SHZT001'">
                <div class="content" @click="auditPass(true)">审核通过</div>
                <div class="content" @click="auditPass(false)">审核不通过</div>
                <div class="content" @click="modRisk">修改风险点</div>
                <div class="content" v-if="clickType =='wid'" @click="modCompany">修订危险源</div>
                <div class="content" v-if="clickType =='wid'" @click="modApprove">修订评价</div>
                <div class="content" v-if="clickType =='gid'" @click="setMeasure('add')">增加管理措施</div>
                <div class="content" v-if="clickType =='gid'" @click="setMeasure('mod')">修订管控措施</div>
                <div class="content" v-if="clickType =='gid'" @click="delMeasure">删除管控措施</div>
            </div>
            <div class="content" @click="goDetail">查看详情</div>
        </van-action-sheet>
        <!-- 弹窗组 -->
        <div>
            <!-- 修改风险点 -->
            <set-risk
                :setShow="riskShow"
                type="mod"
                :selectData="selectData"
                @popupClose="riskShow=false"
                @suc="clearData"
            ></set-risk>
            <!-- 修改危险源 -->
            <set-company
                :setShow="companyShow"
                type="mod"
                :fid="selectData.fid"
                :selectData="selectData"
                @popupClose="companyShow=false"
                @suc="clearData"
            ></set-company>
            <!-- 修改评价 -->
            <company-approve
                :appShow="approveShow"
                :selectData="selectData"
                @popupClose="approveShow=false"
            ></company-approve>
            <!-- 新增、修改管控措施 -->
            <set-measure
                :setShow="measureShow"
                :type="measureType"
                :wid="selectData.wid"
                :selectData="selectData"
                @popupClose="measureShow=false"
                @suc="clearData"
            ></set-measure>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
// 风险点
import setRisk from "@/components/risk/risk/setRisk";
// 危险源
import setCompany from "@/components/risk/company/setCompany";
// 管控措施
import setMeasure from "@/components/risk/measure/setMeasure";
// 评价
import companyApprove from "@/components/risk/company/companyApprove";
export default {
    name: "auditDetailListChang",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/cjshlist.action",
                obj: {
                    "bean.deptid": this.$route.query.deptid,
                    "bean.param": this.$route.query.auditid
                }
            },
            // 操作面板显示
            popshow: false,
            // 点击类型
            clickType: "",
            // 选中项
            selectData: {},
            // 修改风险点
            riskShow: false,
            // 修改危险源
            companyShow: false,
            // 修改评价
            approveShow: false,
            // 增、改管控措施
            measureShow: false,
            measureType: "add"
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
        // 每项点击
        btnClick(obj, type) {
            this.$store.commit("getSelectData", obj);
            this.clickType = type;
            this.selectData = obj;
            this.popshow = true;
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
            let _self = this;
            let obj = {
                "bean.cid": this.selectData.cid,
                "bean.param": this.$route.query.auditid
            };
            if (bol) {
                this.$dialog
                    .confirm({
                        title: "审核通过",
                        message: "确定执行此操作?"
                    })
                    .then(resolve => {
                        _self.$api.risk
                            .auditPass(obj)
                            .then(res => {
                                let data = eval("(" + res + ")");
                                // 数据有误
                                if (!data.success) {
                                    _self.$toast("提交不成功");
                                    return;
                                }
                                _self.postSuccess();
                            })
                            .catch(reject => {});
                    });
            } else {
                this.$dialog
                    .confirm({
                        title: "审核不通过",
                        message: "确定执行此操作?"
                    })
                    .then(resolve => {
                        _self.$api.risk.auditNoPass(obj).then(res => {
                            let data = eval("(" + res + ")");
                            // 数据有误
                            if (!data.success) {
                                _self.$toast("提交不成功");
                                return;
                            }
                            _self.postSuccess();
                        });
                    })
                    .catch(reject => {});
            }
        },
        // 风险点
        modRisk() {
            this.popshow = false;
            this.riskShow = true;
        },
        // 危险源
        modCompany() {
            this.popshow = false;
            this.companyShow = true;
        },
        // 评价
        modApprove() {
            this.popshow = false;
            this.approveShow = true;
        },
        // 评价
        setMeasure(type) {
            this.popshow = false;
            this.measureShow = true;
            this.measureType = type;
        },
        // 删除操作
        delMeasure() {
            this.popshow = false;
            let _self = this;
            this.$dialog
                .confirm({
                    title: "删除",
                    message: "确定执行此操作?"
                })
                .then(resolve => {
                    _self.$api.risk
                        .measureDelete({
                            "bean.gid": _self.selectData.gid
                        })
                        .then(res => {
                            let data = eval("(" + res + ")");
                            // 数据有误
                            if (!data.success) {
                                this.$toast("删除不成功");
                                return;
                            }
                            _self.clearData();
                        });
                })
                .catch(reject => {});
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
                        // 深拷贝
                        let obj = JSON.parse(JSON.stringify(item));
                        // 加入到其危险源
                        item.child = [obj];
                        // 加入到其管控措施
                        item.child[0].child = [obj];
                        // 推入数组
                        returnArr.push(item);
                    } else if (fidIndex >= 0) {
                        // 风险点一致 匹配危险源
                        let widArr = returnArr[fidIndex].child;
                        let widIndex = getItem("wid", item.wid, widArr);
                        if (widIndex >= 0) {
                            // 危险源不一致 向后新增
                            if (!widArr[widIndex].child) {
                                widArr[widIndex].child = [];
                            }
                            widArr[widIndex].child.push(item);
                        } else if (widIndex == -1) {
                            // 危险源一致 匹配危险源
                            let obj = JSON.parse(JSON.stringify(item));
                            item.child = [obj];
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
        setRisk,
        setCompany,
        setMeasure,
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