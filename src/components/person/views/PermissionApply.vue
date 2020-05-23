<template>
    <div>
        <SearchBox placeholder="请输入安排作业单位搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.apdanwei}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>作业名称: {{item.workname}}</p>
                        </div>
                        <div>
                            <p>施工单位: {{item.sgdanwei}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="detailShow" @close="detailShow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>安排作业单位: {{selectData.apdanwei}}</p>
                </div>
                <div>
                    <p>作业名称: {{selectData.workname}}</p>
                </div>
                <div>
                    <p>施工单位: {{selectData.sgdanwei}}</p>
                </div>
                <div>
                    <p>预计作业开始时间: {{selectData.worktimes}}</p>
                </div>
                <div>
                    <p>预计作业结束时间: {{selectData.worktimee}}</p>
                </div>
                <div>
                    <p>作业具体方案: {{selectData.workscheme}}</p>
                </div>
                <div>
                    <p>计划单位负责人: {{selectData.planman}}</p>
                </div>
                <div>
                    <p>编制人: {{selectData.aurhorized}}</p>
                </div>
                <div>
                    <p>编制时间: {{selectData.aurhorizetime}}</p>
                </div>
                <div>
                    <p>审批意见: {{selectData.doexpinfo}}</p>
                </div>
                <div>
                    <p>审批部门: {{selectData.doexpdanwei}}</p>
                </div>
                <div>
                    <p>审批人: {{selectData.doexpman}}</p>
                </div>
                <div>
                    <p>审批时间: {{selectData.doexptime}}</p>
                </div>
                <div>
                    <p>
                        附件名称:
                        <a
                            :href="selectData.attach?selectData.attach:''"
                        >{{selectData.attachname}}</a>
                    </p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "PermissionApply",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/permissionapply/list.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            detailShow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.detailShow = true;
            }
        }
    },
    components: {
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>