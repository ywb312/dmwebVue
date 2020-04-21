<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="体检详细名单" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrap">
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
                                <p>工号: {{item.jobnum}}</p>
                            </div>
                            <div>
                                <p>姓名: {{item.name}}</p>
                            </div>
                            <div>
                                <p>体检类型: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>接触有毒物质: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>性别: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>身份证号: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>总工龄: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>工种: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>部门: {{item.checkDept}}</p>
                            </div>
                            <div>
                                <p>联系方式: {{item.checkDept}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="tip">
                    <van-divider>没有更多数据了</van-divider>
                </div>
            </ViewBox>
        </div>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "healthReport",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate//health/examdetail/doList.action",
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