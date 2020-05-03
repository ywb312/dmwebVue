<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="已办事项"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h3>{{index+1+"."+item.mattername}}</h3>
                    </div>
                    <div class="main">
                        <div>
                            <span>事项内容: {{item.memo}}</span>
                        </div>
                        <div>
                            <span>发布时间: {{item.addtime}}</span>
                        </div>
                        <div>
                            <span>处理人员: {{item.handlename}}</span>
                        </div>
                        <div>
                            <span>处理时间: {{item.handletime}}</span>
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
    name: "finished",
    data() {
        return {
            // 渲染数据
            rendering: [],
            postData: {
                url: "/pub/tomatter/list.action?filters=CLZT002",
                obj: {}
            }
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>