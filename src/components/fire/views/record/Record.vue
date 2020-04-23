<template>
    <div>
        <SearchBox placeholder="请输入记录名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>记录名称: {{item.projectName}}</p>
                        </div>
                        <div>
                            <p>记录人: {{item.recordman}}</p>
                        </div>
                        <div>
                            <p>记录日期: {{item.createDate}}</p>
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
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "Record",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        switch (this.pageData.id) {
            case "moninspection":
                this.postData.url = "biz/operate/moninspection/list.action";
                break;
            case "monfeedback":
                this.postData.url = "biz/operate/monfeedback/list.action";
                break;
            case "monreview":
                this.postData.url = "biz/operate/monreview/list.action";
                break;
            case "specialcheck":
                this.postData.url = "biz/operate/specialcheck/list.action";
                break;
            case "spefeedback":
                this.postData.url = "biz/operate/spefeedback/list.action";
                break;
            case "spereview":
                this.postData.url = "biz/operate/spereview/list.action";
                break;
            case "firerecord":
                this.postData.url = "biz/operate/firerecord/list.action";
                break;
            case "firefeedback":
                this.postData.url = "biz/operate/firefeedback/list.action";
                break;
            case "firereview":
                this.postData.url = "biz/operate/firereview/list.action";
                break;
            case "blazerecord":
                this.postData.url = "biz/operate/blazerecord/list.action";
                break;
            case "blazefeedback":
                this.postData.url = "biz/operate/blazefeedback/list.action";
                break;
            case "blazereview":
                this.postData.url = "biz/operate/blazereview/list.action";
                break;
        }
    },
    methods: {
        getRendering(arr) {
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