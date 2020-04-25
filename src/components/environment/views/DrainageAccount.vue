<template>
    <div>
        <SearchBox placeholder="请输入排口名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.ventname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>排口类型: {{item.venttype}}</p>
                        </div>
                        <div>
                            <p>级别: {{item.grade}}</p>
                        </div>
                        <div>
                            <p>编号: {{item.number}}</p>
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
    name: "DrainageAccount",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/drainageacc/list.action",
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