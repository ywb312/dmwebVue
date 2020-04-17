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
                        <h4>{{index+1+'.'+item.personnel}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>布工作服: {{item.bgzf}}</p>
                        </div>
                        <div>
                            <p>管理服: {{item.glf}}</p>
                        </div>
                        <div>
                            <p>布胶鞋: {{item.bjx}}</p>
                        </div>
                        <div>
                            <p>全棉衬衣: {{item.qmcy}}</p>
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
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "ArticleStandard",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/protect/protectArticleStandard/list.action",
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
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/person/articlDetail",
                query: {
                    type: "2"
                }
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>