<template>
    <div>
        <SearchBox placeholder="请输入项目名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.projname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>项目类型: {{item.projtype}}</p>
                        </div>
                        <div>
                            <p>建设内容: {{item.consontent}}</p>
                        </div>
                        <div>
                            <p>立项时间: {{item.projecttime}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.memo}}</p>
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
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "ProjectConst",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/projectconst/list.action",
                obj: {
                    "bean.param": ""
                }
            }
        };
    },
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
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/environment/ProjectConstDetail"
            });
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>