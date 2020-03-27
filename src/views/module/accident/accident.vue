<template>
    <div class="accident">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <preview :params="params" :pageData="pageData"></preview>
        </div>
    </div>
</template>
<script>
import preview from "@/components/pub/preview";
export default {
    name: "accident",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 传入的对象
            params: {
                olddate: "0"
            },
            page: [
                {
                    text: "事故快报"
                },
                {
                    text: "事故详情"
                },
                {
                    text: "成立事故调查组"
                },
                {
                    text: "现场调查取证"
                },
                {
                    text: "事故分析"
                },
                {
                    text: "调查报告"
                },
                {
                    text: "事故事件库"
                }
            ]
        };
    },
    created() {
        let a = this.$route.query.a;
        this.pageData = this.page[a]; //当前页面的配置
    },
    methods: {},
    components: {
        preview
    }
};
</script>
<style scoped>
.accident {
    height: 100%;
}
</style>