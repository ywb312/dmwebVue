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