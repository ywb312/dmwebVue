<template>
    <div class="risk">
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
    name: "risk",
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
                    text: "风险点划分"
                },
                {
                    text: "危险源辨识"
                },
                {
                    text: "风险等级评级"
                },
                {
                    text: "管控措施制定"
                },
                {
                    text: "风险清单"
                },
                {
                    text: "安全风险公告栏"
                },
                {
                    text: "岗位风险告知卡"
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
.risk {
    height: 100%;
}
.wrap {
    padding-top: 1.1rem;
}
</style>