<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick"
                >
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:70px">
                            <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>危险源名称: {{item.wname}}</span>
                        </div>
                        <div>
                            <span>危险源责任单位: {{item.deptname}}</span>
                        </div>
                        <div>
                            <span>
                                风险等级:
                                <van-tag
                                    size="large"
                                    round
                                    :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                    :color="item.grade == 3?'yellow':''"
                                >{{item.grade+"级"}}</van-tag>
                            </span>
                        </div>
                        <div>
                            <span>项目: {{item.project}}</span>
                        </div>
                        <div>
                            <span>内容: {{item.content}}</span>
                        </div>
                        <div>
                            <span>影响范围: {{item.yxfwText}}</span>
                        </div>
                        <div>
                            <span>可能导致的事故: {{item.knfsText}}</span>
                        </div>
                        <div>
                            <span>潜在后果: {{item.qzhgText}}</span>
                        </div>
                        <div>
                            <span>可能性(L): {{item.l}}</span>
                        </div>
                        <div>
                            <span>严重性(E): {{item.e}}</span>
                        </div>
                        <div>
                            <span>频繁度(C): {{item.c}}</span>
                        </div>
                        <div>
                            <span>管控措施: {{item.gname}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet v-model="sheetShow" cancel-text="取消" close-on-click-action>
            <div class="content" @click="modRisk">修改风险点</div>
            <div class="content" @click="modCompany">修订危险源</div>
            <div class="content" @click="delCompany">删除危险源</div>
            <div class="content" @click="modApprove">修订评价</div>
            <div class="content" @click="setMeasure('add')">增加管理措施</div>
            <div class="content" @click="setMeasure('mod')">修订管控措施</div>
            <div class="content" @click="delMeasure">删除管控措施</div>
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
                @suc="clearData"
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
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/rootlist.action",
                obj: {}
            },
            upUrl: "",
            knfs: "",
            yxfw: "",
            qzhg: "",
            fxtype: "",
            sheetShow: false,
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
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        // 处理请求的数据
        getRendering(arr) {
            if (this.knfs == "") {
                this.promiseAll().then(res => {
                    this.knfs = res[0];
                    this.yxfw = res[1];
                    this.qzhg = res[2];
                    this.fxtype = res[3];
                    arr.forEach(element => {
                        this.$common.code2Text(element, "knfs", this.knfs);
                        this.$common.code2Text(element, "yxfw", this.yxfw);
                        this.$common.code2Text(element, "qzhg", this.qzhg);
                        this.$common.code2Text(element, "fxtype", this.fxtype);
                    });
                    this.rendering = arr;
                });
            } else {
                arr.forEach(element => {
                    this.$common.code2Text(element, "knfs", this.knfs);
                    this.$common.code2Text(element, "yxfw", this.yxfw);
                    this.$common.code2Text(element, "qzhg", this.qzhg);
                    this.$common.code2Text(element, "fxtype", this.fxtype);
                });
                this.rendering = arr;
            }
        },
        promiseAll() {
            return Promise.all([
                this.$common.comboList({ sourcename: "KNFS" }),
                this.$common.comboList({ sourcename: "YXFWEI" }),
                this.$common.comboList({ sourcename: "QZHG" }),
                this.$common.comboList({ sourcename: "FXDLX" }),
                this.$common.comboList({ sourcename: "GKCSLX" })
            ]);
        },
        // 每项点击
        btnClick(obj, type) {
            this.$store.commit("getSelectData", obj);
            this.clickType = type;
            this.selectData = obj;
            this.sheetShow = true;
        },
        // 查看详情按钮点击
        goDetail() {
            this.sheetShow = false;
            this.$router.push({
                path: "/risk/auditDetail"
            });
        },
        // 风险点
        modRisk() {
            this.sheetShow = false;
            this.riskShow = true;
        },
        // 危险源
        modCompany() {
            this.sheetShow = false;
            this.companyShow = true;
        },
        delCompany() {
            this.sheetShow = false;
            this.$dialog
                .confirm({
                    title: "删除",
                    message: "确定执行此操作?"
                })
                .then(resolve => {
                    this.$api.risk
                        .companyRiskDelete({
                            "bean.wid": this.selectData.wid
                        })
                        .then(res => {
                            let data = eval("(" + res + ")");
                            // 数据有误
                            if (!data.success) {
                                this.$toast("删除不成功");
                                return;
                            }
                            this.clearData();
                        });
                })
                .catch(reject => {});
        },
        // 评价
        modApprove() {
            this.sheetShow = false;
            this.approveShow = true;
        },
        // 管控措施
        setMeasure(type) {
            this.sheetShow = false;
            this.measureShow = true;
            this.measureType = type;
        },
        // 删除操作
        delMeasure() {
            this.sheetShow = false;
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
        }, // 清空数据 重新加载
        clearData() {
            this.$refs.view.clearData();
        }
    },
    computed: {},
    components: {
        ViewBox,
        setRisk,
        setCompany,
        setMeasure,
        companyApprove
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