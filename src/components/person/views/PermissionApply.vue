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
                    <!-- <div class="title">
                        <h4>{{index+1+"."+item.title}}</h4>
                        <p style="min-width:40px">
                            <mt-badge size="small">{{item.moduleid}}</mt-badge>
                        </p>
                    </div>-->
                    <div class="main">
                        <div>
                            <p>许可任务: {{item.task}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "PermissionApply",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/permissionapply/list.action",
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
            this.$refs.view.cleraData();
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