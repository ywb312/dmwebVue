<template>
    <div>
        <SearchBox placeholder="请输入项目名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.projectName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>审查日期: {{item.createDate}}</p>
                        </div>
                        <div>
                            <p>审查内容: {{item.content}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
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
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "TechonlogyExamine",
    data() {
        return {
            rendering: [],
            postData: {
                url: "",
                obj: {
                    "bean.param": ""
                }
            }
        };
    },
    created() {
        // 1安全环保设施设计审查  2职业卫生设施设计审查  3消防项目设计审查
        if (this.pageData.element == "1") {
            this.postData.url = "biz/operate/safeexamine/list.action";
        } else if (this.pageData.element == "2") {
            this.postData.url = "biz/operate/occhealthreview/list.action";
        } else if (this.pageData.element == "3") {
            this.postData.url = "biz/operate/firedesignreview/list.action";
        }
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