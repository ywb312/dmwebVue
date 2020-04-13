<template>
    <div>
        <SearchBox placeholder="请输入排水原因搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <!-- <div class="title">
                        <h4>{{index+1+"."+item.projectName}}</h4>
                    </div>-->
                    <div class="main">
                        <div>
                            <p>排水量（m³）: {{item.tonage}}</p>
                        </div>
                        <div>
                            <p>排水原因: {{item.reason}}</p>
                        </div>
                        <div>
                            <p>排水责任人: {{item.person}}</p>
                        </div>
                        <div>
                            <p>排水日期: {{item.createDate}}</p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''">{{item.attachname}}</a>
                            </p>
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
    name: "TechonlogyDrainInfo",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/draininfo/list.action",
                obj: {
                    "bean.param": ""
                }
            }
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