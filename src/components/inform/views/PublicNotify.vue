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
                            <van-tag round type="primary">{{item.notiftype}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <span>审核人: {{item.checkman}}</span>
                        </div>
                        <div>
                            <span>发布单位: {{item.createdept}}</span>
                        </div>
                        <div>
                            <span>发布时间: {{item.createtime}}</span>
                        </div>
                        <div>
                            <span>修改时间: {{item.modifytime}}</span>
                        </div>
                        <div>
                            <span>审核时间: {{item.checktime}}</span>
                        </div>
                        <div>
                            <span>消息内容: {{delHtmlTag(item.content)}}</span>
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
    name: "PublicNotify",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/pub/publicnotify/list.action",
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
        btnClick(obj) {},
        //正则去掉所有的html标记
        delHtmlTag(str) {
            str = str.replace(/&nbsp/g, "");
            return str.replace(/<[^>]+>/g, "");
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>