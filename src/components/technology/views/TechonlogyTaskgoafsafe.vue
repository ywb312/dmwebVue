<template>
    <div>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                    <div class="main">
                        <div>
                            <p>
                                附件名称:
                                <a :href="item.attach?item.attach:''"  target="_blank">{{item.attachname}}</a>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建日期:</span>
                                <span class="main_val">{{item.creatdate}}</span>
                            </p>
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
    name: "TechonlogyTaskgoafsafe",
    data() {
        return {
            rendering: [],
            postData: {
                url:
                    "manager/sys/upfile/selectBybusnameOrKey.action?businessname=采空区安全防范措施&tableprimarykey=taskgoafsafe",
                obj: {
                    "bean.param": "",
                },
            },
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        btnClick(obj) {},
    },
    components: {
        ViewBox,
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>