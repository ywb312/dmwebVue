<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="title">
                        <h4>{{index+1+'.'+item.name}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>一级危险源: {{item.onegrade+"个"}}</p>
                        </div>
                        <div>
                            <p>二级危险源: {{item.twograde+"个"}}</p>
                        </div>
                        <div>
                            <p>三级危险源: {{item.threegrade+"个"}}</p>
                        </div>
                        <div>
                            <p>四级危险源: {{item.fourgrade+"个"}}</p>
                        </div>
                        <div>
                            <p>危险源合计: {{item.allgrade+"个"}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "riskChart",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/risk/info/fxwxytjlist.action",
                obj: {}
            }
        };
    },
    methods: {
        // 处理请求的数据
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