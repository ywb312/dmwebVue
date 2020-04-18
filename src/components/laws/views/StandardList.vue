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
                        <h4>{{index+1+"."+item.ruleName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>颁布单位: {{item.issueDept}}</p>
                        </div>
                        <div>
                            <p>颁布时间: {{item.issueDate}}</p>
                        </div>
                        <div>
                            <p>实施时间: {{item.implementDate}}</p>
                        </div>
                        <div>
                            <p>更新修订时间: {{item.updateIssueDate}}</p>
                        </div>
                        <div>
                            <p>更新实施时间: {{item.updateImplementDate}}</p>
                        </div>
                        <div>
                            <p>识别数量: {{item.discernCount}}</p>
                        </div>
                        <div>
                            <p>适用条款: {{item.applicable}}</p>
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
    name: "StandardList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/rule/standardList/list.action",
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