<template>
    <div>
        <SearchBox placeholder="请输入许可任务搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <!-- <div class="title">
                        <h4>{{index+1+"."+item.title}}</h4>
                        <p style="min-width:40px">
                            <van-tag round type="primary">{{item.moduleid}}</van-tag>
                        </p>
                    </div>-->
                    <div class="main">
                        <div>
                            <p>许可任务: {{item.task}}</p>
                        </div>
                        <div>
                            <p>许可范围: {{item.scope}}</p>
                        </div>
                        <div>
                            <p>批准许可人: {{item.approver}}</p>
                        </div>
                        <div>
                            <p>许可措施: {{item.measure}}</p>
                        </div>
                        <div>
                            <p>分配责任人: {{item.duty}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.memo}}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "PermissionInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/permissioninfo/list.action",
                obj: {}
            }
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
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>