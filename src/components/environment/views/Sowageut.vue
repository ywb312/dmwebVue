<template>
    <div>
        <SearchBox placeholder="请输入项目名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.solwastype}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>利用率(%): {{item.utirate}}</p>
                        </div>
                        <div>
                            <p>产生量(吨): {{item.proquantity}} | 利用量(吨): {{item.utilization}}</p>
                        </div>
                        <div>
                            <p>外销量(吨): {{item.extsales}} | 贮存量(吨): {{item.stocap}}</p>
                        </div>
                        <div>
                            <p>日期: {{item.monthtime}}</p>
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
    name: "Sowageut",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/sowageut/list.action",
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