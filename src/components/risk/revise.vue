<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                        <p style="min-width:70px">
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
                                    <span>危险源责任单位:</span>
                                    <span>{{item.deptname}}</span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span>项目: {{item.project}} | 内容: {{item.content}}</span>
                                </p>
                            </div>
                            <div>
                                <p>可能性:{{n.l}}|严重性:{{n.e}}|频繁度:{{n.c}}</p>
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
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet v-model="sheetShow" cancel-text="取消" close-on-click-action>
            <div class="content" @click="modRisk">修改风险点</div>
            <div v-if="clickType =='wid'">
                <div class="content" @click="modCompany">修订危险源</div>
                <div class="content" @click="delCompany">删除危险源</div>
                <div class="content" @click="modApprove">修订评价</div>
            </div>
            <div v-if="clickType =='gid'">
                <div class="content" @click="setMeasure('add')">增加管理措施</div>
                <div class="content" @click="setMeasure('mod')">修订管控措施</div>
                <div class="content" @click="delMeasure">删除管控措施</div>
            </div>
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
                obj: {
                    rows: 15
                }
            },
            upUrl: "",
            knfs: "",
            yxfw: "",
            qzhg: "",
            fxtype: "",
            gtype: "",
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
            measureType: "add",
            clickType: "wid",
            deptId: window.localStorage.deptid
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
                    this.gtype = res[4];
                    arr.forEach(element => {
                        this.$common.code2Text(element, "knfs", this.knfs);
                        this.$common.code2Text(element, "yxfw", this.yxfw);
                        this.$common.code2Text(element, "qzhg", this.qzhg);
                        this.$common.code2Text(element, "fxtype", this.fxtype);
                        this.$common.code2Text(element, "gtype", this.gtype);
                    });
                    this.rendering = this.setRes(arr);
                });
            } else {
                arr.forEach(element => {
                    this.$common.code2Text(element, "knfs", this.knfs);
                    this.$common.code2Text(element, "yxfw", this.yxfw);
                    this.$common.code2Text(element, "qzhg", this.qzhg);
                    this.$common.code2Text(element, "fxtype", this.fxtype);
                    this.$common.code2Text(element, "gtype", this.gtype);
                });
                this.rendering = this.setRes(arr);
            }
        },
        // 查询字典值
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
                            "bean.wid": this.selectData.wid,
                            "bean.deptid": this.deptId
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
                            "bean.gid": _self.selectData.gid,
                            "bean.deptid": this.deptId
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
        // 设置返还参数
        setRes(arr) {
            let _self = this;
            let returnArr = [];
            function getItem(key, val, arr) {
                return arr.findIndex(item => item[key] == val);
            }
            // 如果name,fxtype和上一项的name,fxtype不一致就推入新数组,否则添加子元素
            arr.forEach((item, index, arr) => {
                let fidIndex = getItem("fid", item.fid, returnArr);
                if (fidIndex == -1) {
                    // 风险点不一致 向后新增
                    // 深拷贝
                    let obj = Object.assign(item);
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
                        // 危险源一致 匹配危险源
                        if (!widArr[widIndex].child) {
                            widArr[widIndex].child = [];
                        }
                        widArr[widIndex].child.push(item);
                    } else if (widIndex == -1) {
                        // 危险源不一致 向后新增
                        let obj = Object.assign(item);
                        item.child = [obj];
                        widArr.push(item);
                    }
                }
            });
            return returnArr;
        },
        // 清空数据 重新加载
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