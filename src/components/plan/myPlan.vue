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
                        <p class="main_tag">
                            <van-tag round size="large" type="primary">{{item.checktype}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">检查截止时间:</span>
                                <span class="main_val">{{item.checkdeadline}}</span>
                            </p>
                            <p class="main_tag">
                                <van-tag round size="large" type="primary">{{item.planstatus}}</van-tag>
                            </p>
                        </div>
                    </div>
                </div>
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
    methods: {
        getRendering(v) {
            this.rendering = v;
        },
        btnClick(obj) {
            this.$store.commit("getSelectData", obj);
            this.$router.push({
                path: "/plan/myPlanDetail"
            });
        }
    },
    components: {
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>