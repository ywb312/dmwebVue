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
                                <span class="main_title">上次检测日期: </span>
                                <span class="main_val">{{
                                    item.scjcdate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">计划检测日期: </span>
                                <span class="main_val">{{
                                    item.jhjcdate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">实际检测日期: </span>
                                <span class="main_val">{{
                                    item.xcjcdate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检测结果: </span>
                                <span class="main_val">{{
                                    item.checkresult
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p>
                                特种设备检测详情附件:
                                <a
                                    :href="item.attach ? item.attach : ''"
                                    target="_blank"
                                    >{{ item.attachname }}</a
                                >
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
    name: "equipbookresult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/equipbookresult/list.action",
                obj: {
                    "bean.toeid": this.pageData.param.toeid,
                },
            },
        };
    },
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