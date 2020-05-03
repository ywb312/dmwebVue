<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="照明编号维护"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                        <div class="title">
                            <h4>{{index+1+".照明编号:"+item.hydrantcode}}</h4>
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
    name: "illumineNumber",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/hyd/illuminerant/list.action",
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