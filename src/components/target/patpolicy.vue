<template>
    <div>
        <SearchBox placeholder="请输入内容搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">发布单位:</span>
                                <span class="main_val">{{item.pubdept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">制定时间:</span>
                                <span class="main_val">{{item.createtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">审批时间:</span>
                                <span class="main_val">{{item.audittime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">发布时间:</span>
                                <span class="main_val">{{item.pubtime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">内容:</span>
                                <span class="main_val">{{item.suggestion}}</span>
                            </p>
                        </div>
                    </div>
                </div>
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