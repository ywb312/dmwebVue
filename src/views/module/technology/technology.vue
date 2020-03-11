<template>
    <div class="technology">
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
    name: "technology",
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
                    text: "项目三同时管理"
                },
                {
                    text: "排水安全管理"
                },
                {
                    text: "供电安全管理"
                },
                {
                    text: "顶板、采空区管理"
                },
                {
                    text: "通风安全管理"
                },
                {
                    text: "提升运输安全管理"
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
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
.technology {
    height: 100%;
}
.wrap {
    padding-top: 1.1rem;
}
</style>