<template>
    <div>
        <search-box placeholder="请输入计划名称" @callback="searchBack"></search-box>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.planname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <span>培训内容: {{item.contextvalue}}</span>
                        </div>
                        <div>
                            <span>开始时间: {{item.starttime}}</span>
                        </div>
                        <div>
                            <span>培训地点: {{item.traplace}}</span>
                        </div>
                        <div>
                            <span>组织单位: {{item.hostdept}}</span>
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
import ViewBox from "@/components/pub/ViewBox.vue";
import SearchBox from "@/components/pub/SearchBox";
export default {
    name: "traplan",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/tra/traplan/list.action",
                obj: {
                    "bean.param": "",
                    "bean.element": this.pageData.element
                }
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
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/education/traplanDetail"
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