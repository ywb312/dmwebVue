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
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            _self.$common.comboList({ sourcename: "SYLX" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "example", res);
                });
                _self.rendering = arr;
            });
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>