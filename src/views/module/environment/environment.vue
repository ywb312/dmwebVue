<template>
    <div class="environment">
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
    name: "environment",
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
                    text: "在线设施台账"
                },
                {
                    text: "固体废物产生利用统计表"
                },
                {
                    text: "项目建设情况"
                },
                {
                    text: "排口台账"
                },
                {
                    text: "评先创优情况"
                },
                {
                    text: "危险废物处置统计表"
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
.environment {
    height: 100%;
}
</style>