<template>
    <div>
        <SearchBox
            placeholder="请输入设计名称搜索"
            @callback="searchBack"
        ></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">设计名称:</span>
                                <span class="main_val">{{
                                    item.designname
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">设计人:</span>
                                <span class="main_val">{{ item.host }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">设计部门:</span>
                                <span class="main_val">{{
                                    item.designerdeptText
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">记录人:</span>
                                <span class="main_val">{{
                                    item.recorder
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach ? item.attach : ''">{{
                                    item.attachname
                                }}</a>
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
    name: "TechonlogyProdcreview",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/prod/prodcreview/list.action",
                obj: {
                    "bean.param": "",
                },
            },
        };
    },
    created() {},
    methods: {
        getRendering(arr) {
            let _self = this;
            this.$common.comboList({ sourcename: "SJBM" }).then((res) => {
                arr.forEach((element) => {
                    _self.$common.code2Text(element, "designerdept", res);
                });
                _self.rendering = arr;
            });
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