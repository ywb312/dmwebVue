<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "remind",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "隐患预警",
                    id: "warninginfo"
                },
                {
                    text: "检查逾期预警",
                    id: "checkplannotice"
                },
                {
                    text: "隐患逾期预警",
                    id: "zdriskolddatenotice",
                    components: "dangerNotice"
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
                    if (!item.components) {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 隐患预警
        warninginfo: resolve =>
            require(["@/components/remind/views/WarningInfo"], resolve),
        // 检查逾期预警
        checkplannotice: resolve =>
            require(["@/components/remind/views/CheckPlanNotice"], resolve),
        // 隐患逾期预警
        dangerNotice: resolve =>
            require(["@/components/remind/views/dangerNotice"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>