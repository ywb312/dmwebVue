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
                            <p>检测项: {{ item.mitem }}</p>
                        </div>
                        <div>
                            <p>检测值: {{ item.mnumber }}</p>
                        </div>
                        <div>
                            <p>是否超限: {{ item.address }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "dustResult",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/waterresult/list.action",
                obj: {
                    filters: this.pageData.param.filters,
                    "bean.tablesuffix": this.pageData.param.tablesuffix,
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
        Popup,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>