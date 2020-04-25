<template>
    <div>
        <SearchBox placeholder="请输入采样点,水样搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>采样点: {{item.location}}</p>
                        </div>
                        <div>
                            <p>水样: {{item.exampleText}}</p>
                        </div>
                        <div>
                            <p>检测项目: {{item.mitem}}</p>
                        </div>
                        <div>
                            <p>标准值(最小): {{item.standardnumbermin}}</p>
                        </div>
                        <div>
                            <p>标准值(最大): {{item.standardnumbermax}}</p>
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
    name: "WaterNumber",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/waternumber/list.action",
                obj: {}
            },
            sylxArr: [
                {
                    id: "SYLX001",
                    text: "进水"
                },
                {
                    id: "SYLX002",
                    text: "出水"
                },
                {
                    id: "SYLX003",
                    text: "井下水"
                },
                {
                    id: "SYLX004",
                    text: "地表水"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "example", this.sylxArr);
            });
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