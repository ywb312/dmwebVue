<template>
    <div>
        <SearchBox placeholder="请输入名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.sysName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>编制部门: {{item.compileDept}}</p>
                        </div>
                        <div>
                            <p>批准人: {{item.ratifyMan}}</p>
                        </div>
                        <div>
                            <p>发布时间: {{item.issueDate}}</p>
                        </div>
                        <div>
                            <p>实施时间: {{item.implementDate}}</p>
                        </div>
                        <div>
                            <p>文件编号: {{item.fileNum}}</p>
                        </div>
                        <div>
                            <p>执笔人: {{item.penner}}</p>
                        </div>
                        <div>
                            <p>更新修订时间: {{item.updateIssueDate}}</p>
                        </div>
                        <div>
                            <p>更新实施时间: {{item.updateImplementDate}}</p>
                        </div>
                        <div>
                            <p>
                                文件:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                            </p>
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
    name: "SystemList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/rule/systemList/list.action",
                obj: {}
            }
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
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