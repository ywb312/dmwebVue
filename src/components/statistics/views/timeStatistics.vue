<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="按时间统计"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="popshow=true"
        >
            <template #right>
                <img src="@/assets/iconfont/search.svg" />
            </template>
        </van-nav-bar>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">名次:</span>
                                <span class="main_val">{{item.rn}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">周期:</span>
                                <span class="main_val">{{item.cycle}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">时间:</span>
                                <span class="main_val">{{item.troublesum}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患数量总和:</span>
                                <span class="main_val">{{item.h}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">已整改数量:</span>
                                <span class="main_val">{{item.y}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">未整改数量:</span>
                                <span class="main_val">{{item.w}}</span>
                            </p>
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
    name: "timeStatistics",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sa/time/list.action",
                obj: {}
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
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