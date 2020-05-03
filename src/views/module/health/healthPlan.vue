<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="部门安排"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div
                        class="wrapper"
                        v-for="(item,index) in rendering"
                        :key="index"
                        @click="btnClick(item)"
                    >
                        <div class="main">
                            <div>
                                <p>部门: {{item.deptid}}</p>
                            </div>
                            <div>
                                <p>职业危害: {{item.professiondamage}}</p>
                            </div>
                            <div>
                                <p>检查机构: {{item.checkDept}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "healthPlan",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/report/dolist.action",
                obj: {
                    filters: this.$route.query.filters
                }
            }
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {});
            this.rendering = arr;
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>