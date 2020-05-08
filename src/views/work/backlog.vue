<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="待办事项"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <ViewBox
            :postData="postData"
            ref="view"
            @getRendering="getRendering"
            @getBacklog="getBacklog"
        >
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="item.id"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h3>{{index+1+"."+item.name}}</h3>
                    </div>
                    <div class="main">
                        <div>
                            <span
                                v-if="item.startUserName"
                            >{{item.startUserName+"发现的"+item.crname+"进行"+item.taskDefinitionKeyText+"处理"}}</span>
                            <span v-else>任务描述</span>
                            <span style="min-width:80px;text-align: right;">{{item.owner}}</span>
                        </div>
                        <div>
                            <span>{{item.createTime}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 隐藏的组件 -->
        <!-- 自定义操作面板 -->
        <van-action-sheet v-model="sheetShow" cancel-text="取消" close-on-click-action>
            <div
                v-show="selectData.assignee == '' && selectData.isactiviti == '1'"
                class="content"
                @click="claim"
            >签收</div>
            <div class="content" @click="action">办理</div>
            <div class="content" @click="goDetail">隐患详情</div>
            <div class="content" @click="compShow = true">审批记录</div>
        </van-action-sheet>
        <div>
            <record :compShow="compShow" @popupClose="compShow=false" />
        </div>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import record from "@/components/danger/record";
export default {
    name: "backlog",
    data() {
        return {
            // 渲染数据
            rendering: [],
            postData: {
                url: "/manager/activity/taskList.action",
                obj: {}
            },
            selectData: {},
            // 控制模态框的显示a
            sheetShow: false,
            // 审批记录操作框
            compShow: false,
            taskKeyArr: [
                { id: "zczg", text: "自查自改" },
                { id: "db", text: "督办指派" },
                { id: "zg", text: "整改" },
                { id: "zpzg", text: "整改" },
                { id: "ys", text: "验收" },
                { id: "bh", text: "闭环" },
                { id: "zpys", text: "指派验收" },
                { id: "sb", text: "指派验收" },
                { id: "jkaqhbb", text: "评估处理" }
            ]
        };
    },
    methods: {
        // 获取需要渲染的数据
        getRendering(arr) {
            arr.forEach(item => {
                this.$common.code2Text(
                    item,
                    "taskDefinitionKey",
                    this.taskKeyArr
                );
            });
            this.rendering = arr;
        },
        // 更新待办事项提醒角标
        getBacklog(res) {
            this.$store.commit("setBacklog", res);
        },
        // 按钮点击事件popup组件显示
        btnClick(obj) {
            obj.yhid = obj.bussinesskey;
            this.selectData = obj;
            this.$store.commit("getSelectData", obj);
            this.sheetShow = true;
        },
        // 签收
        claim() {
            this.sheetShow = false;
            this.$api.pub
                .getConfig("/manager/activity/claim.action", {
                    taskId: this.selectData.id
                })
                .then(res => {
                    var data = eval("(" + res + ")");
                    if (data.success) {
                        this.$refs.view.cleraData();
                    } else {
                        alertMsg("操作失败" + data.errormessage);
                    }
                });
        },
        // 办理
        action() {
            this.sheetShow = false;
            this.$router.push({
                path: "/backlog/change",
                query: {
                    type: this.selectData.taskDefinitionKey
                }
            });
        },
        // 隐患详情
        goDetail() {
            this.sheetShow = false;
            this.$router.push({
                path: "/danger/detail"
            });
        }
    },
    components: {
        ViewBox,
        record
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