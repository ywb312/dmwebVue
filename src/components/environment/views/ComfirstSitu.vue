<template>
    <div>
        <SearchBox placeholder="请输入项目名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.awardname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>获奖单位: {{item.awardept}}</p>
                        </div>
                        <div>
                            <p>获奖级别: {{item.awardlevel}}</p>
                        </div>
                        <div>
                            <p>评奖时间: {{item.awardtime}}</p>
                        </div>
                        <div>
                            <p>证书: {{item.certificate}}</p>
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
                url: "biz/operate/comfirstsitu/list.action",
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
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/environment/ComfirstDetail"
            });
        }
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>