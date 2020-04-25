<template>
    <div>
        <SearchBox placeholder="请输入记录名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>记录编号: {{item.recordNum}}</p>
                        </div>
                        <div>
                            <p>记录名称: {{item.recordName}}</p>
                        </div>
                        <div>
                            <p>保存地点: {{item.savePlace}}</p>
                        </div>
                        <div>
                            <p>保存形式: {{item.saveForm}}</p>
                        </div>
                        <div>
                            <p>保存期限: {{item.saveYear}}</p>
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
    name: "FireWorkList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/fireworklist/list.action",
                obj: {}
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