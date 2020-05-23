<template>
    <div>
        <SearchBox
            :placeholder="pageData.element=='1'?'请输入水泵检查内容搜索':'请输入水仓检查内容搜索'"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.content}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>负责人: {{item.person}}</p>
                        </div>
                        <div>
                            <p>检查日期: {{item.content}}</p>
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
            
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "TechonlogyDrainCheck",
    data() {
        return {
            rendering: [],
            postData: {
                url: "",
                obj: {
                    "bean.param": ""
                }
            }
        };
    },
    created() {
        // 1水泵 2水仓
        if (this.pageData.element == "1") {
            this.postData.url = "biz/operate/draincheck/list.action";
        } else if (this.pageData.element == "2") {
            this.postData.url = "biz/operate/dibholecheck/list.action";
        }
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
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