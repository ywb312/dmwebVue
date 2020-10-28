<template>
    <div>
        <SearchBox
            placeholder="请输入项目名称搜索"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">项目名称: </span>
                                <span class="main_val">{{
                                    item.projectName
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">竣工验收日期: </span>
                                <span class="main_val">{{
                                    item.applyDate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">竣工验收内容: </span>
                                <span class="main_val">{{ item.content }}</span>
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
    name: "maintaincheck",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/maintaincheck/list.action",
                obj: {
                    "bean.tablesuffix": this.pageData.param.filters,
                },
            },
            // 查找组件的显示
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