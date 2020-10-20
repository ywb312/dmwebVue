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
                                    >健康检查结果总数:
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
    name: "CheckResultCount",
    data() {
        return {
            rendering: [],
            postData: {
                url:
                    "biz/operate/health/examdetail/checkResultListCount.action",
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
                text: "职业健康检查结果汇总表",
                components: "CheckResult",
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