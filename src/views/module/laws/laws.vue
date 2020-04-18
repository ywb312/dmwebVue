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
    name: "laws",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "法律法规库(环保)",
                    id: "rules1"
                },
                {
                    text: "法律法规库(消防)",
                    id: "rules2"
                },
                {
                    text: "法律法规库(安全)",
                    id: "rules3"
                },
                {
                    text: "法律法规识别(环保)",
                    id: "identify1"
                },
                {
                    text: "法律法规识别(消防)",
                    id: "identify2"
                },
                {
                    text: "法律法规识别(安全)",
                    id: "identify3"
                },
                {
                    text: "符合性评价(环保)",
                    id: "evalu1"
                },
                {
                    text: "符合性评价(消防)",
                    id: "evalu2"
                },
                {
                    text: "符合性评价(安全)",
                    id: "evalu3"
                },
                {
                    text: "法律法规、标准清单",
                    id: "standardList"
                },
                {
                    text: "安全环保部制度清单",
                    id: "systemList"
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
                    if (!isNaN(i * 1)) {
                        item.components = id.substring(0, id.length - 1);
                        item.element = "YS00" + i;
                    } else {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 法律法规库
        rules: resolve => require(["@/components/laws/views/Rules"], resolve),
        // 法律法规识别
        identify: resolve => require(["@/components/laws/views/Identify"], resolve),
        // 符合性评价
        evalu: resolve => require(["@/components/laws/views/Evalu"], resolve),
        // 法律法规、标准清单
        standardList: resolve => require(["@/components/laws/views/StandardList"], resolve),
        // 安全环保部制度清单
        systemList: resolve => require(["@/components/laws/views/SystemList"], resolve),
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>