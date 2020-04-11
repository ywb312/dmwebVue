<template>
    <div class="patpolicy">
        <SearchBox placeholder="请输入内容搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>发布单位: {{item.pubdept}}</p>
                        </div>
                        <div>
                            <p>制定时间: {{item.createtime}}</p>
                        </div>
                        <div>
                            <p>审批时间: {{item.audittime}}</p>
                        </div>
                        <div>
                            <p>发布时间: {{item.pubtime}}</p>
                        </div>
                        <div>
                            <p>内容: {{item.suggestion}}</p>
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
    name: "patpolicy",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/patpolicy/list.action",
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
            // this.$store.commit("getSelectData", obj);
            // this.$router.push({
            //     path: "/education/traplanDetail"
            // });
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>