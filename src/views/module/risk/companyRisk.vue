<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="危险源"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 渲染当前页面 -->
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+'.'+item.wname}}</h4>
                    </div>
                    <div class="main">
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
                            <span>可能导致的危害: {{item.knfsText}}</span>
                        </div>
                        <div>
                            <span>潜在风险: {{item.qzhgText}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 新增按钮 -->
        <div>
            <van-button class="btn" type="info" size="large" @click="addClick">新增危险源</van-button>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet v-model="sheetShow" cancel-text="取消" close-on-click-action>
            <div class="content" @click="modCompanyRisk">修改</div>
            <div class="content" @click="delData">删除</div>
            <div v-if="$common.getLevel() > 1">
                <div class="content" @click="showPj">评价</div>
                <div class="content" @click="goMeasure">查看管控措施</div>
            </div>
        </van-action-sheet>
        <!-- 组件框 -->
        <div>
            <set-company
                :setShow="setShow"
                :type="type"
                :fid="$route.query.fid"
                :selectData="selectData"
                @popupClose="setShow=false"
                @suc="clearData"
            ></set-company>
            <company-approve
                :appShow="approveShow"
                :selectData="selectData"
                @popupClose="approveShow=false"
                @suc="clearData"
            ></company-approve>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
// 增删改框
import setCompany from "@/components/risk/company/setCompany";
// 评价框
import companyApprove from "@/components/risk/company/companyApprove";
export default {
    name: "companyRisk",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/companyRisk/list.action",
                obj: {
                    "bean.fid": this.$route.query.fid
                }
            },
            // 选中的对象
            selectData: {},
            // 控制操作模态框的显示
            sheetShow: false,
            // 增删改查组件的显示
            setShow: false,
            type: "add",
            approveShow: false
        };
    },
    created() {},
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "YXFWEI" }),
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "QZHG" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "yxfw", res[0]);
                    _self.$common.code2Text(element, "knfs", res[1]);
                    _self.$common.code2Text(element, "qzhg", res[2]);
                });
                _self.rendering = arr;
            });
        },
        addClick() {
            this.type = "add";
            this.setShow = true;
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        showPj() {
            this.sheetShow = false;
            this.approveShow = true;
        },
        // 跳转至管控措施
        goMeasure() {
            this.sheetShow = false;
            this.$router.push({
                path: "/risk/measure",
                query: {
                    wid: this.selectData.wid
                }
            });
        },
        modCompanyRisk() {
            this.sheetShow = false;
            this.type = "mod";
            this.setShow = true;
        },
        // 删除操作
        delData() {
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
        clearData() {
            this.$refs.view.clearData();
        }
    },
    components: {
        ViewBox,
        setCompany,
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
