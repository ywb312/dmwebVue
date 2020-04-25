<template>
    <div>
        <SearchBox placeholder="请输入演练名称/预案名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.plantitle}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>预案名称: {{item.sortname}}</p>
                        </div>
                        <div>
                            <p>演练类型: {{item.plantypeText}}</p>
                        </div>
                        <div>
                            <p>演练时间: {{item.plantime}}</p>
                        </div>
                        <div>
                            <p>演练地点: {{item.planplace}}</p>
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
    name: "EmergAgency",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/eme/drillplan/list.action",
                obj: {
                    "bean.element": this.pageData.element,
                    "bean.param": ""
                }
            },
            planTypeArr: [
                { id: "YLLX001", text: "模拟演练" },
                { id: "YLLX002", text: "桌面演练" },
                { id: "YLLX003", text: "培训演练" },
                { id: "YLLX004", text: "其他" },
                { id: "YLLX005", text: "综合演练" }
            ]
        };
    },
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "plantype", this.planTypeArr);
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
        },
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/emergency/emergDrillDetail",
                query: {
                    type: "1"
                }
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