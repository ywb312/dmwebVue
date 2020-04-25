<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            :title="pageData.text"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "accident",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "事故快报(环保)",
                    id: "accireport1"
                },
                {
                    text: "事故快报(消防)",
                    id: "accireport2"
                },
                {
                    text: "事故快报(安全)",
                    id: "accireport3"
                },
                {
                    text: "事故详情(环保)",
                    id: "accidetabs1"
                },
                {
                    text: "事故详情(消防)",
                    id: "accidetabs2"
                },
                {
                    text: "事故详情(安全)",
                    id: "accidetabs3"
                },
                {
                    text: "成立事故调查组(环保)",
                    id: "relateduser1"
                },
                {
                    text: "成立事故调查组(消防)",
                    id: "relateduser2"
                },
                {
                    text: "成立事故调查组(安全)",
                    id: "relateduser3"
                },
                {
                    text: "现场调查取证(环保)",
                    id: "accihapevi1"
                },
                {
                    text: "现场调查取证(消防)",
                    id: "accihapevi2"
                },
                {
                    text: "现场调查取证(安全)",
                    id: "accihapevi3"
                },
                {
                    text: "事故分析(环保)",
                    id: "accisutabs1"
                },
                {
                    text: "事故分析(消防)",
                    id: "accisutabs2"
                },
                {
                    text: "事故分析(安全)",
                    id: "accisutabs3"
                },
                {
                    text: "调查报告(环保)",
                    id: "accsureport1"
                },
                {
                    text: "调查报告(消防)",
                    id: "accsureport2"
                },
                {
                    text: "调查报告(安全)",
                    id: "accsureport3"
                },
                {
                    text: "事故事件库(环保)",
                    id: "accistore1"
                },
                {
                    text: "事故事件库(消防)",
                    id: "accistore2"
                },
                {
                    text: "事故事件库(安全)",
                    id: "accistore3"
                }
            ]
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach(item => {
                if (item.id == id) {
                    let i = id.charAt(id.length - 1);
                    item.components = id.substring(0, id.length - 1);
                    item.element = "YS00" + i;
                    this.pageData = item;
                }
            });
        }
    },
    computed: {},
    components: {
        // 事故分析和事故详情接口一致 现场调查取证和成立事故调查组接口一致
        // 事故快报
        accireport: resolve =>
            require(["@/components/accident/views/AccirePort"], resolve), //详情
        // 事故详情
        accidetabs: resolve =>
            require(["@/components/accident/views/Accidetabs"], resolve), //详情
        // 成立事故调查组
        relateduser: resolve =>
            require(["@/components/accident/views/RelateDuser.vue"], resolve), //详情
        // 现场调查取证
        accihapevi: resolve =>
            require(["@/components/accident/views/Accihapevi.vue"], resolve), //详情
        // 事故分析
        accisutabs: resolve =>
            require(["@/components/accident/views/Accisutabs.vue"], resolve), //详情
        // 调查报告
        accsureport: resolve =>
            require(["@/components/accident/views/Accsureport.vue"], resolve), //详情
        // 事故事件库
        accistore: resolve =>
            require(["@/components/accident/views/Accistore.vue"], resolve) //详情
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>