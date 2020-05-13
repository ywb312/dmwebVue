<template>
    <div>
        <SearchBox placeholder="请输入会议问题搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">会议问题:</span>
                                <span class="main_val">{{item.problem}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">解决措施:</span>
                                <span class="main_val">{{item.resolve}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建时间:</span>
                                <span class="main_val">{{item.createDate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">问题解决进度:</span>
                                <span class="main_val">{{item.progress}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">附件名称:</span>
                                <span class="main_val">
                                    <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                                </span>
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
    name: "ResolveMeasure",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/resolvemeasure/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>