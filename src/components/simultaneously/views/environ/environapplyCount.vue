<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                >
                    <div class="main">
                        <div @click="btnClick(item, '新建项目')">
                            <p class="main_text">
                                <span class="main_title">新建项目: </span>
                                <span class="main_val">{{
                                    item.xjxmcount
                                }}</span>
                            </p>
                        </div>
                        <div @click="btnClick(item, '改建项目')">
                            <p class="main_text">
                                <span class="main_title">改建项目: </span>
                                <span class="main_val">{{
                                    item.gjxmcount
                                }}</span>
                            </p>
                        </div>
                        <div @click="btnClick(item, '扩建项目')">
                            <p class="main_text">
                                <span class="main_title">扩建项目: </span>
                                <span class="main_val">{{
                                    item.kjxmcount
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
    name: "environapplyCount",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/environapply/selectCount.action",
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
        btnClick(item, type) {
            // 向父组件传值 切换组件
            let componentConfig = {
                text: "环保项目申请",
                components: "environapply",
                param: {
                    type: type,
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