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
    name: "inform",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "通知公告管理",
                    id: "publicnotify"
                },
                {
                    text: "新闻动态",
                    id: "pubcontext"
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
                    item.components = item.id;
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 通知公告管理
        publicnotify: resolve =>
            require(["@/components/inform/views/PublicNotify"], resolve),
        // 新闻动态
        pubcontext: resolve =>
            require(["@/components/inform/views/PubContext"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>