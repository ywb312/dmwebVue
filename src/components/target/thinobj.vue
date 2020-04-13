<template>
    <div>
        <SearchBox placeholder="请输入内容搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.objname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>{{item.year+"年度"}}</p>
                            <p>
                                <mt-badge size="small">{{item.dept}}</mt-badge>
                            </p>
                        </div>
                        <div>
                            <p>目标指标: {{item.aim}}</p>
                        </div>
                        <div>
                            <p>目标措施: {{item.measures}}</p>
                        </div>
                        <div>
                            <p>进度安排: {{item.schedule}}</p>
                        </div>
                        <div>
                            <p>投资预算: {{item.estimate+"万元"}}</p>
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
    name: "thinobj",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/thinobj/list.action",
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