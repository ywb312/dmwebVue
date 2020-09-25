<template>
    <div>
        <SearchBox placeholder="请输入地址搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.address}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>检测时间: {{item.checkDate}}</p>
                        </div>
                        <div>
                            <p>风速: {{item.windSpeed}} | 风量:{{item.airVolume}}</p>
                        </div>
                        <div>
                            <p>断面: {{item.section}} | 温度:{{item.temperature}}</p>
                        </div>
                        <div>
                            <p>状况分析: {{item.analysis}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''"  target="_blank">{{item.attachname}}</a>
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
    name: "TechonlogyVentilation",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/prod/prodaeration/list.action",
                obj: {
                    "bean.param": "",
                },
            },
        };
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