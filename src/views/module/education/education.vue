<template>
    <div class="education page">
        <!-- 标题  -->
        <van-nav-bar
            :title="pageData.text"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
            <component ref="child" :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "education",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "培训计划管理(消防)",
                    id: "traplan2"
                },
                {
                    text: "培训计划管理(环保)",
                    id: "traplan1"
                },
                {
                    text: "培训计划管理(安全)",
                    id: "traplan3"
                },
                {
                    text: "考试"
                },
                {
                    text: "考试结果"
                },
                {
                    text: "我的考试结果"
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
        traplan: resolve => require(["@/components/education/traplan"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>