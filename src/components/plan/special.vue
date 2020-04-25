<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <span>检查内容: {{item.checkdeadline}}</span>
                        </div>
                        <div>
                            <span>检查开始时间: {{item.checkdeadline}}</span>
                        </div>
                        <div>
                            <span>检查结束时间: {{item.checkdeadline}}</span>
                        </div>
                        <div>
                            <span>已完成: {{item.checkdeadline}}</span>
                        </div>
                        <div>
                            <span>未完成: {{item.checkdeadline}}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
        <van-button class="btn" type="info" size="large" @click="addData">新增专项检查计划</van-button>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "special",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sc/checkplantemp/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        btnClick(obj) {
            // this.$store.commit("getSelectData", obj);
        },
        addData() {}
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>