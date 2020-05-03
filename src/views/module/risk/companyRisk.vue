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
            <van-button class="btn" type="info" size="large" @click="addshow=true">新增危险源</van-button>
        </div>
        <!-- 隐藏的组件 -->
        <!-- 操作按钮点击 -->
        <van-action-sheet
            v-model="popshow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 组件框 -->
        <div>
            <add-company
                :addshow="addshow"
                :fid="$route.query.fid"
                @popupClose="addshow=false"
                @addSuc="clearData"
            ></add-company>
            <modify-company
                :modShow="modShow"
                :selectData="selectData"
                @popupClose="modShow=false"
                @suc="clearData"
            ></modify-company>
            <delete-company
                :delShow="delShow"
                :wid="selectData.wid"
                @popupClose="delShow=false"
                @suc="clearData"
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
import ViewBox from "@/components/pub/ViewBox.vue";
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
            popshow: false,
            actions: [
                { name: "修改" },
                { name: "删除" },
                { name: "评价" },
                { name: "查看管控措施" }
            ],
            // 增删改查组件的显示
            addshow: false,
            modShow: false,
            delShow: false,
            approveShow: false
        };
    },
    created() {},
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "yxfw", this.yxfwSlots);
                this.$common.code2Text(element, "knfs", this.knfsSlots);
                this.$common.code2Text(element, "qzhg", this.qzhgSlots);
            });
            this.rendering = arr;
        },
        // 操作按钮点击事件
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
        // 跳转至管控措施
        goRouter() {
            if (window.localStorage["roleLevel"] == "1") {
                return;
            }
            this.$router.push({
                path: "/risk/measure",
                query: {
                    wid: this.selectData.wid
                }
            });
        },
        onSelect(item) {
            if (item.name == "修改") {
                this.popshow = false;
                this.modShow = true;
            } else if (item.name == "删除") {
                this.popshow = false;
                this.delShow = true;
            } else if (item.name == "评价") {
                this.popshow = false;
                this.approveShow = true;
            } else if (item.name == "查看管控措施") {
                this.goRouter();
            }
        },
        clearData() {
            this.$refs.view.cleraData();
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
        ViewBox,
        addCompany,
        modifyCompany,
        deleteCompany,
        companyApprove
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>