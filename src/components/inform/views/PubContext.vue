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
                        <h4>{{index+1+"."+item.title}}</h4>
                        <p style="min-width:40px">
                            <mt-badge size="small">{{item.moduleid}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>子栏目: {{item.remarks}}</span>
                        </div>
                        <div>
                            <span>发布人: {{item.pubman}}</span>
                        </div>
                        <div>
                            <span>发布单位: {{item.pubdept}}</span>
                        </div>
                        <div>
                            <span>发布时间: {{item.pubtime}}</span>
                        </div>
                        <div>
                            <span>修改人: {{item.updateman}}</span>
                        </div>
                        <div>
                            <span>修改时间: {{item.updatetime}}</span>
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
    name: "PubContext",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/pub/pubcontext/publist.action",
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
        btnClick(obj) {}
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>