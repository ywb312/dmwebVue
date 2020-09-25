<template>
    <div>
        <SearchBox placeholder="请输入水仓清淤责任人内容搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <!-- <div class="title">
                        <h4>{{index+1+"."+item.projectName}}</h4>
                    </div>-->
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">水仓清淤负责人:</span>
                                <span class="main_val">{{item.person}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">水仓清淤日期:</span>
                                <span class="main_val">{{item.createDate}}</span>
                            </p>
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
    name: "TechonlogyDredging",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/dibholedesilt/list.action",
                obj: {
                    "bean.param": "",
                },
            },
        };
    },
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
        btnClick(obj) {},
    },
    components: {
        SearchBox,
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>