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
                        <div>
                            <p class="main_text">
                                <span class="main_title">项目名称: </span>
                                <span class="main_val">{{
                                    item.projectName
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">设计单位: </span>
                                <span class="main_val">{{
                                    item.projectResearch
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">设计方案: </span>
                                <span class="main_val">{{ item.content }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">安全预评价单位: </span>
                                <span class="main_val">{{
                                    item.projectResearch
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >安全预评价备案函:
                                </span>
                                <span class="main_val">{{
                                    item.reference
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >《安全篇》编制单位:
                                </span>
                                <span class="main_val">{{
                                    item.projectResearch
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >《安全专篇》批复:
                                </span>
                                <span class="main_val">{{
                                    item.reference
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >安全验收评价单位:
                                </span>
                                <span class="main_val">{{
                                    item.projectResearch
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">竣工验收及批复: </span>
                                <span class="main_val">{{
                                    item.jgcontent
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
    name: "safeapplySum",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/safeapply/selectCount1.action",
                obj: {
                    "bean.param": "",
                },
            },
            // 查找组件的显示
        };
    },
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
    },
    components: {
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>