<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="法律法规识别记录清单"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="title">
                            <h4>{{index+1+"."+item.rulename}}</h4>
                        </div>
                        <div class="main">
                            <div>
                                <p>发布单位: {{item.dept}}</p>
                            </div>
                            <div>
                                <p>适用条款说明: {{item.termstate}}</p>
                            </div>
                            <div>
                                <p>适用范围: {{item.extent}}</p>
                            </div>
                            <div>
                                <p>发布日期: {{item.releasedate}}</p>
                            </div>
                            <div>
                                <p>实施日期: {{item.carryoutdate}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "lawsList",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            active: 1,
            postData: {
                url: "biz/operate/rule/identifyrules/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
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