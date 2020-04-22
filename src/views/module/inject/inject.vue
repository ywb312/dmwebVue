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
    name: "inject",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "安全投入使用计划管理",
                    id: "safeinvestment"
                },
                {
                    text: "安全措施项目记录管理",
                    id: "safemeasures"
                },
                {
                    text: "安全科研技改项目记录管理",
                    id: "saferesearch"
                },
                {
                    text: "安全生产责任险批号管理",
                    id: "safenum"
                    // }, {
                    // 	text: "安全生产责任险名单上报",
                    // 	id: "safelist",
                },
                {
                    text: "安全生产责任险登记",
                    id: "saferesp"
                },
                {
                    text: "工伤保险理赔信息记录",
                    id: "safeinsurance"
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
        // 安全投入使用计划管理
        safeinvestment: resolve =>
            require(["@/components/inject/views/SafeInvestment"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>