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
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h3>{{index+1+"."+item.name}}</h3>
                    </div>
                    <div class="main">
                        <div>
                            <span
                                v-if="item.startUserName"
                            >{{item.startUserName+"发现的"+item.crname+"进行"+item.taskKeyText+"处理"}}</span>
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
        <van-action-sheet
            v-model="popshow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <record :compShow="compShow" @popupClose="compShow=false" />
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
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
            popshow: false,
            actions: [
                { name: "自查自改" },
                { name: "上报上级" },
                { name: "隐患指派" }
            ],
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = this.settingRes(arr);
        },
        // 按钮点击事件popup组件显示
        btnClick(obj) {
            obj.yhid = obj.bussinesskey;
            this.selectData = obj;
            this.$store.commit("getSelectData", obj);
            this.popshow = true;
        },
        // 处理res.rows的taskDefinitionKey
        settingRes(arr) {
            arr.forEach(item => {
                if (item.taskDefinitionKey == "zczg") {
                    item.taskKeyText = "自查自改";
                }
            });
            return arr;
        },
        onSelect(item) {
            if (item.name == "自查自改") {
                this.routerPush("zczg");
            } else if (item.name == "上报上级") {
            } else if (item.name == "隐患指派") {
            }
        },
        routerPush(str) {
            this.$router.push({
                path: "/backlog/change",
                query: {
                    type: str
                }
            });
        }
    },
    components: {
        ViewBox,
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>