<template>
    <div>
        <SearchBox placeholder="请输入危险废物名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.hazwasname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>处置量(吨): {{item.disvolume}} | 处置率(%): {{item.disrate}}</p>
                        </div>
                        <div>
                            <p>产生量(吨): {{item.proquantity}} | 贮存量(吨): {{item.stocap}}</p>
                        </div>
                        <div>
                            <p>处置单位或方法: {{item.disunitmet}}</p>
                        </div>
                        <div>
                            <p>日期: {{item.monthtime}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.memo}}</p>
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
    name: "ComfirstSitu",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/hazwastedis/list.action",
                obj: {
                    "bean.param": ""
                }
            }
        };
    },
    created() {},
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
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