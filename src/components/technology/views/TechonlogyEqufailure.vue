<template>
    <div>
        <SearchBox placeholder="请输入点检人名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+"."+item.faultaddress}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">故障时间:</span>
                                <span class="main_val">{{item.faultdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">故障原因:</span>
                                <span class="main_val">{{item.faultcause}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">处理结果:</span>
                                <span class="main_val">{{item.disresult}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">汇报人:</span>
                                <span class="main_val">{{item.reportman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">落实人:</span>
                                <span class="main_val">{{item.verifyman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">备注:</span>
                                <span class="main_val">{{item.memo}}</span>
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
    name: "TechonlogyEqufailure",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/sexsystem/equfailure/list.action",
                obj: {
                    "bean.param": "",
                },
            },
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
        btnClick(obj) {},
    },
    components: {
        SearchBox,
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>