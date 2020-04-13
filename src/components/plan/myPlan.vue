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
                    <div class="title">
                        <h4>{{index+1+"."+item.cpname}}</h4>
                        <p style="min-width:40px">
                            <mt-badge size="small">{{item.checktype}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>检查截止时间: {{item.checkdeadline}}</span>
                            <mt-badge size="small">{{item.planstatus}}</mt-badge>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="tip">
                <van-divider>没有更多数据了</van-divider>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "myPlan",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sc/checkplan/list.action",
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
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>