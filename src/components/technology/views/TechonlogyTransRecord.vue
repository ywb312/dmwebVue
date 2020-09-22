<template>
    <div>
        <SearchBox placeholder="请输入地址搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div v-if="postData.element == '1'" slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.projectName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">运输线路检查负责人:</span>
                                <span class="main_val">{{item.person}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">运输线路检查内容:</span>
                                <span class="main_val">{{item.content}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">运输线路检查日期:</span>
                                <span class="main_val">{{item.createDate}}</span>
                            </p>
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
            <div v-else slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.projectName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测检验负责人:</span>
                                <span class="main_val">{{item.person}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测检验内容:</span>
                                <span class="main_val">{{item.content}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测检验日期:</span>
                                <span class="main_val">{{item.createDate}}</span>
                            </p>
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
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "TechonlogyTransRecord",
    data() {
        return {
            rendering: [],
            postData: {
                url: "",
                obj: {
                    "bean.param": "",
                },
            },
        };
    },
    props: {
        pageData: {
            type: Object,
            required: true,
        },
    },
    created() {
        if (this.pageData.element == "1") {
            this.postData.url = "biz/operate/transrecord/list.action";
        } else if (this.pageData.element == "2") {
            this.postData.url = "biz/operate/impequipment/list.action";
        }
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
        btnClick(obj) {},
    },
    components: {
        SearchBox,
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>