<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">矿山名称: </span>
                                <span class="main_val">{{
                                    item.mineName
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >水土保持竣工验收总数:
                                </span>
                                <span class="main_val">{{
                                    item.xgfCount
                                }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "maintaincheckCount",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/maintaincheck/dolistCount.action",
                obj: {
                    "bean.param": "",
                },
            },
            // 查找组件的显示
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        btnClick(item) {
            // 向父组件传值 切换组件
            let componentConfig = {
                text: "水土保持竣工验收的汇总统计",
                components: "maintaincheck",
                param: {
                    filters: item.suffix,
                },
            };
            this.$emit("choiseComponent", componentConfig);
        },
    },
    components: {
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>