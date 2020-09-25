<template>
    <div>
        <SearchBox
            placeholder="请输入检测单位搜索"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                >
                    <div class="title">
                        <h4>{{ index + 1 + "." + item.unitname }}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测日期:</span>
                                <span class="main_val">{{
                                    item.checkdate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测结果:</span>
                                <span class="main_val">{{
                                    item.checkresult
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">报告上传日期:</span>
                                <span class="main_val">{{
                                    item.createDate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a
                                    :href="item.attach ? item.attach : ''"
                                    target="_blank"
                                    >{{ item.attachname }}</a
                                >
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
    name: "Equipcheck",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/equipcheck/list.action",
                obj: {
                    "bean.param": "",
                },
            },
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
            this.$refs.view.clearData();
        },
    },
    components: {
        SearchBox,
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>